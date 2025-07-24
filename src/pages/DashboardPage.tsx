import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ユーザー情報型
interface User {
  id: number;
  username: string;
}

// 商品データ型
interface FoodItem {
  id: number;
  name: string;
  img_url: string;
  location: string;
  expiration_date?: string; // ?を付けることによって必須入力ではなくなる
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null); // ユーザー情報を保持
  const [myFoodItems, setMyFoodItems] = useState<FoodItem[]>([]); // 自分が登録した食品
  const [appliedFoodItems, setAppliedFoodItems] = useState<FoodItem[]>([]); // 自分が応募した食品
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogout = () => {
    localStorage.removeItem('token'); // localStorageからトークンを削除
    navigate('/'); // ホームページにリダイレクト
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        // トークンがない場合はログインページにリダイレクト
        if (!token) {
          navigate('/login');
          return;
        }

        // 複数のAPIを並行して呼び出す
        const [userRes, myFoodsRes, appliedFoodsRes] = await Promise.all([
          fetch('/api/v1/me', { // ユーザー情報取得API
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('/api/v1/my/foods', { // 自分が登録した食品一覧API
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('/api/v1/my/applications', { // 自分が応募した食品一覧API
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        if (!userRes.ok) throw new Error('ユーザー情報の取得に失敗しました');
        const userData: User = await userRes.json();
        console.log('APIから取得したユーザー情報:', userData); // ★デバッグ用ログを追加
        setUser(userData);

        if (myFoodsRes.ok) {
          const myFoodsData: FoodItem[] = await myFoodsRes.json();
          setMyFoodItems(myFoodsData);
        }

        if (appliedFoodsRes.ok) {
          const appliedFoodsData: FoodItem[] = await appliedFoodsRes.json();
          setAppliedFoodItems(appliedFoodsData);
        }
      } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error); // ★エラー内容を詳しく表示
        // エラーハンドリング: トークン切れなどでログインページに飛ばすなど
        if (error instanceof Error && (error.message.includes('401') || error.message.includes('Failed to fetch'))) {
            handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  console.log('現在のuser state:', user); // ★デバッグ用ログを追加

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {user ? `${user.username}さんの` : ''}ダッシュボード
        </h1>
        <h1 className="text-2xl font-bold text-gray-800">
          ようこそ
        </h1>
        <div>
          <button
            onClick={() => navigate('/app/register-food')} // TODO: 食品登録ページへの導線
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            食品を登録する
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            ログアウト
          </button>
        </div>
      </header>
      <main className="container mx-auto p-8">
        {/* 自分が登録した食品セクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">あなたが登録した食品</h2>
          {/* レスポンシブ対応 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
            {myFoodItems.length > 0 ?(
              myFoodItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src={item.img_url} alt={item.name} className="w-full h-48 object-cover"/>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    {/* 期限の表示 この書き方だとyyyy/mm/ddの形式になる */}
                    {item.expiration_date && (
                      <p className="text-red-500 font-semibold">
                        この商品の期限は{new Date(item.expiration_date).toLocaleDateString()}です
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>現在登録された商品はありません</p>
            )}
          </div>
        </section>

        {/* TODO: 自分が応募した食品セクションも同様に作成 */}
      </main>
    </div>
  );
};

export default DashboardPage;