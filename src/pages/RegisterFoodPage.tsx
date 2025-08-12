import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { FoodFormData } from '../interface/types';
import ImageUploader from '../components/foodregister/ImageUploader'
import initialFormData from '../data/InitialFormData';
import { validateFormData } from '../utils/FormValidation';
import FoodForm from '../components/foodregister/FoodForm'
 
const RegisterFoodPage: React.FC = () => {
  const navigate = useNavigate();

  // フォーム入力状態の管理
  const [formData, setFormData] = useState<FoodFormData>(initialFormData);

  // 画像ファイルを管理する状態を追加
  const [images, setImages] = useState<File[]>([]);

  // ImageUploaderから画像ファイルを受け取る関数
  const handleImagesChange = (files: (File | null)[]) => {
    // null を除外して File のみ使いたいので filter をかける
    const validFiles = files.filter((file): file is File => file !== null);
    setImages(validFiles);
  };

  // APIへ送信する関数（FormDataを使う版）
  const handleSubmit = async() => {
    
    const errorMsg = validateFormData(formData, images);
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    try{
      const token = localStorage.getItem('token'); // ログイン時に保存されたトークンを取得

      // FormDataオブジェクトを作成
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('description', formData.description);
      fd.append('quantity', formData.quantity.toString());
      fd.append('unit', formData.unit);
      fd.append('expiration_date', formData.expiration_date);
      fd.append('location', formData.location);

      // 画像ファイルをFormDataに追加
      images.forEach((file) => {
        fd.append('images', file);
      });

      const response = await fetch('/api/v1/items/', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' は設定しない（ブラウザが自動でセット）
        },
        body: fd,
      });

      if(response.ok) {
        alert('商品の登録が完了しました');
        navigate('/app/dashboard');
      } else {
        const errorData = await response.json();
        // エラー詳細をコンソールに出力してデバッグしやすくする
        console.error('登録失敗時のエラー詳細:', errorData);

        let alertMessage = '登録失敗: ' + (errorData.message || '入力データが無効です');
        // バックエンドから具体的なエラー内容(errorsオブジェクト)が返されている場合、それを表示する
        if (errorData.errors && typeof errorData.errors === 'object' && Object.keys(errorData.errors).length > 0) {
          // errorsオブジェクトから最初のエラーメッセージを取得
          const firstErrorField = Object.keys(errorData.errors)[0];
          const firstErrorMessage = errorData.errors[firstErrorField];
          const message = Array.isArray(firstErrorMessage) ? firstErrorMessage[0] : firstErrorMessage;
          alertMessage += `\n\n詳細: ${message}`;
        } else if (errorData.detail) {
          alertMessage = '登録失敗: ' + (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail));
        }
        alert(alertMessage);
      }
    } catch(error) {
      alert('通信エラー: ' + error);
    }
  };

  return(
    <div className="min-h-screen bg-gray-100">
      <div className="min-h-screen bg-gray-100 p-8 w-full md:w-2/3 mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          商品登録ページ
        </h1>
        <p className="text-gray-700 mb-4 text-center">画像は6枚までご登録いただけます</p>

        <ImageUploader onImagesChange={handleImagesChange} />
        <FoodForm
          formData={formData}
          setFormData={setFormData}
          onSubmit ={handleSubmit}
        />
      </div>
    </div>
  );
};

export default RegisterFoodPage;
