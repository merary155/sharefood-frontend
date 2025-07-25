import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialFormData } from "../../data/initialFormData";
import LocationPicker from '../map/LocationPicker';
import { MapContainer, TileLayer } from 'react-leaflet';

type FoodFormProps = {
  onSubmit: () => void;
};

const FoodForm: React.FC<FoodFormProps> = ({onSubmit}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

    // 入力変更時に呼ばれる関数
  const handleChange = (
    // inputまたはselect要素の変更イベント、TSで型指定
    e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // 入力された要素のname属性とvalueを取得
    const { name, value } = e.target;
    // formData の状態を更新
    // 以前の状態をコピーして、変更された name プロパティだけ新しい値に差し替える
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <div>
      {/* 商品名入力フォーム */}
      {/* 「左のname」はHTMLの属性名で、「右のname」はその属性にセットする文字列の値 */}
      <p className="text-sm text-gray-400">商品名を入力してください</p>
      <input
        type="text"
        placeholder="商品名（必須）"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* 説明入力フォーム */}
      <input
        type="text"
        placeholder="商品や受け渡し場所の説明（任意）"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* 数量入力フォーム */}
      <p className="text-sm text-gray-400">数量を入力してください</p>
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        min="1"
        step="1"
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* 単位入力フォーム */}
      <p className="text-sm text-gray-400">単位を入力してください</p>
      <input
        type="text"
        placeholder="単位（例：個、kg、袋）"
        name="unit"
        value={formData.unit}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* 有効期限入力フォーム */}
      <p className="text-sm text-gray-400">商品の有効期限を入力してください</p>
      <input
        type="date"
        name="expiration_date"
        value={formData.expiration_date}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* 受け渡し場所を入力で選択 */}
      <p className="text-sm text-gray-400">受け渡し場所を入力してください</p>
      <input
        type="text"
        placeholder='例：〒100-0005 東京都千代田区丸の内'
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full disabled:bg-gray-200"
        disabled={isGeocoding}
      />
      {isGeocoding && <p className="text-sm text-blue-500 -mt-2 mb-4">住所を取得中...</p>}

      {/* 受け渡し場所を地図で選択 */}
      <div>
        <label className="block mb-2 font-bold text-gray-700">受け渡し場所は地図からもご選択いただけます</label>
        <MapContainer
          center={[35.681236, 139.767125]} // 東京駅あたり
          zoom={10}
          style={{ height: '300px', width: '100%' }}
        >
        {/* attributionは著作権 */}
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker
          onLocationChange={handleLocationChange}
          initialPosition={formData.latitude && formData.longitude ? [formData.latitude, formData.longitude] : undefined}
        />
        </MapContainer>
        <p className="mt-2 text-sm text-gray-600">
          選択中の位置: {formData.location || '未選択'}
        </p>
      </div>

      {/* 登録ボタン */}
      <button
        onClick={onSubmit}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
      >
        商品を登録する
      </button>

      {/* 商品一覧ページに戻る */}
      <button 
        onClick={()=>navigate('/app/dashboard')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        商品一覧ページに戻る
      </button>
    </div>
  );
};

export default FoodForm;