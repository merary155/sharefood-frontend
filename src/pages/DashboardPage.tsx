import React, { useEffect, useState } from 'react';

// 仮の食品データ型
interface FoodItem {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
}

const DashboardPage: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const token = localStorage.getItem('token');
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
  }, []);

  if (loading) return <div>読み込み中...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">ダッシュボード</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foodItems.map(item => (
          <div key={item.id} className="border rounded-lg p-4 shadow-lg">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;