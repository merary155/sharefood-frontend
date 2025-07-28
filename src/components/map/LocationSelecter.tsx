import { useState } from 'react';
import { FoodFormData } from '../../interface/types';

const useReverseGeocoding = (setFormData: React.Dispatch<React.SetStateAction<FoodFormData>>) => {
  // 逆ジオコーディング中のローディング状態
  const [isGeocoding, setIsGeocoding] = useState(false);
  // 地図上の位置変更時に location を更新
  const handleLocationChange = async (latlng: string) => {
    const [latStr, lonStr] = latlng.split(',');
    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);
    setIsGeocoding(true);

    // 緯度経度と、一時的に緯度経度の文字列をlocationにセット
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lon, location: latlng }));

    try {
      // 日本語の住所を取得し、詳細情報を含めるようにAPIを調整
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=ja`);
      if (!response.ok) throw new Error('逆ジオコーディングに失敗しました。');
      const data = await response.json();

      // data が存在して、その中に address プロパティがあるかチェック
      if (data && data.address) {
        const addr = data.address;
        const postcode = addr.postcode ? `〒${addr.postcode}` : '';

        // 住所の各部分を日本の順序で配列に格納
        const addressParts = [
          addr.state, // 都道府県
          addr.county, // 郡
          addr.city || addr.town || addr.village, // 市区町村
          addr.suburb, // 町名
          addr.neighbourhood, // 丁目など
        ].filter(Boolean); // Falseとして扱う値を除外 'null'や'undefiend'など

        // 配列の要素の間に何も挟まず住所の文字列を作る
        const mainAddress = addressParts.join('');

        // 番地情報（roadとhouse_number）をハイフンで結合
        const streetAddress = [addr.road, addr.house_number].filter(Boolean).join('-');

        // 郵便番号、主要な住所、番地情報をスペースで区切って結合
        const fullAddress = [postcode, mainAddress, streetAddress].filter(Boolean).join(' ');

        setFormData(prev => ({ ...prev, location: fullAddress || data.display_name || latlng }));
      }
    } catch (error) {
      console.error('逆ジオコーディングエラー:', error);
      alert('住所の自動取得に失敗しました。手動で入力するか、緯度経度のまま登録してください。');
    } finally {
      setIsGeocoding(false);
    }
  };

  return { isGeocoding, handleLocationChange };
};

export default useReverseGeocoding;