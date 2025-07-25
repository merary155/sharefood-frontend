import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import ImageUploader from '../components/foodregister/ImageUploader'
import { initialFormData } from '../data/initialFormData';
import FoodForm from '../components/foodregister/FoodForm'
 
const RegisterFoodPage: React.FC = () => {
  const navigate = useNavigate();

  // フォーム入力状態の管理
  const [formData, setFormData] = useState(initialFormData);

  // 画像ファイルを管理する状態を追加
  const [images, setImages] = useState<File[]>([]);

  // ImageUploaderから画像ファイルを受け取る関数
  const handleImagesChange = (files: (File | null)[]) => {
  // null を除外して File のみ使いたいので filter をかける
  const validFiles = files.filter((file): file is File => file !== null);
  console.log(validFiles);
  };

  // APIへ送信する関数（FormDataを使う版）
  const handleSubmit = async() => {
    // 空文字 or 空白だけの場合
    if (!formData.name.trim()) {
      alert('商品名を入力してください');
      return;
    }

    if (formData.quantity <= 0) {
      alert('数量は1以上で入力してください');
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
      if (formData.expiration_date) {
        fd.append('expiration_date', formData.expiration_date);
      }
      fd.append('location', formData.location);
      fd.append('latitude', formData.latitude.toString());
      fd.append('longitude', formData.longitude.toString());

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
        alert('登録失敗: ' + (errorData.message || 'エラーが発生しました')); 
      }
    } catch(error) {
      alert('通信エラー: ' + error);
    }
  };

  return(
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        商品登録ページ
      </h1>
      <p className="text-gray-700 mb-4">商品登録フォームはこちら</p>

      <ImageUploader onImagesChange={handleImagesChange} />
      <FoodForm
        onSubmit ={handleSubmit}
      />
    </div>
  );
};

export default RegisterFoodPage;
