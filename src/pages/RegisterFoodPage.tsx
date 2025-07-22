import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { text } from 'stream/consumers';

const RegisterFoodPage: React.FC = () => {
  const navigate = useNavigate();

  // フォーム入力状態の管理
  const [formData, setFormData] = useState({
    name: '',
    description : '',
    quantity: 1,
    unit: '',
    expiration_date: '',
    location: '',
  });

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
  
  // APIへ送信する関数
  const handlesubmit = async() => {
    // 空文字 or 空白だけの場合
    if (!formData.name.trim()) {
      alert('商品名を入力してください');
      return;
    }
    // itemNameが入ってる場合
    try{
      const token = localStorage.getItem('token'); // ログイン時に保存されたトークンを取得
      const response = await fetch('/api/v1/items/', {
        method: "POST",
        headers: {
          // 送信するデータがJSON形式であることをサーバーに伝える
          'Content-Type': 'application/json',
          // 認証用ヘッダー。Bearer認証方式でJWTトークンを送ることで、サーバーはユーザーがログイン済みかどうか判断できる
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if(response.ok) {
        alert('商品の登録が完了しました');
        navigate('/dashboard');
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
      
      {/* 商品名入力フォーム */}
      <input
        type = "text"
        placeholder="商品名"
        name="name" {/* 「左のname」はHTMLの属性名で、「右のdescription」はその属性にセットする文字列の値です。 */}
        value={formData.name}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* 登録ボタン */}
      <button
        onClick={handlesubmit}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
      >
        商品を登録する
      </button>

      {/* ログインページに戻る */}
      <button 
      onClick={()=>navigate('/dashboard')}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        ログインページに戻る
      </button>
    </div>
  );
};

export default RegisterFoodPage;