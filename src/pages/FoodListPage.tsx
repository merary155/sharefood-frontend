import { useEffect, useState } from 'react';
import { FoodItem } from '../interface/types';

interface ApiResponse {
  items : FoodItem[]    // FoodItem型で定義したオブジェクトの配列
}

export default function FoodListPage() {
  const [items, setItems] = useState<FoodItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/items/')
      .then((res) => res.json())
      // これと一緒
      // const res = await fetch("/api/v1/items/");
      // const data = await res.json();
      .then((data:ApiResponse) => {
        setItems(data.items); // dataだけだと{'items':[],[] ... ,[]}のように、配列ではなく1つのオブジェクトとして返ってきちゃう
        setLoading(false);
      })
    .catch((err) => {
      console.error("商品一覧の取得に失敗しました", err);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg py-8">
        読み込み中...
      </p>
    );

  if (!items || items.length === 0)
    return (
      <p className="text-center text-red-500 text-lg py-8">
        商品が存在ありません。
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">商品一覧</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 flex flex-col items-center">
              <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover"/>
              <h2 className="text-xl font-semibold mb-2 text-center">{item.name}</h2>
              <p className="text-gray-600 mb-2 text-center">{item.location}</p>
              {item.expiration_date && (
                <p className="text-sm text-red-500 mb-2 text-center">
                  賞味期限: {item.expiration_date}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}