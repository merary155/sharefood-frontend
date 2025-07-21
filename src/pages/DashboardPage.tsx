import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 仮の食品データ型
interface FoodItem {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogout = () => {
    localStorage.removeItem('token'); // localStorageからトークンを削除
    navigate('/'); // ホームページにリダイレクト
  };

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const token = localStorage.getItem('token');
        // トークンがない場合はログインページにリダイレクト
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await fetch('/api/v1/foods', { // バックエンドに食品一覧APIが必要
          headers: {
            'Authorization': `Bearer ${token}`, // 認証トークンをヘッダーに付与
          },
        });
        if (!res.ok) throw new Error('食品情報の取得に失敗しました');
        const data: FoodItem[] = await res.json();
        setFoodItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [navigate]);

  if (loading) return <div>読み込み中...</div>;

  return (
    <div>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">ダッシュボード</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          ログアウト
        </button>
      </header>
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">（ここにダッシュボードのコンテンツが入ります）</h2>
      </div>
    </div>
  );
};

export default DashboardPage;