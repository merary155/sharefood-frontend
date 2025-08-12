import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FoodItem } from '../interface/types';
import useAuthToken from '../components/auth/useAuthToken';
import ToggleAvailabilityButton from '../components/ToggleAvailabilityButton';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, fetchUser, logout } = useAuthToken();// ユーザー情報を保持
  const [myFoodItems, setMyFoodItems] = useState<FoodItem[]>([]); // 自分が登録した食品
  const [appliedFoodItems, setAppliedFoodItems] = useState<FoodItem[]>([]); // 自分が応募した食品
  const [loading, setLoading] = useState<boolean>(true);

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
          fetch('/api/v1/my/items', { // 自分が登録した食品一覧API
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('/api/v1/my/applications', { // 自分が応募した食品一覧API
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        if (myFoodsRes.ok) {
          const myItemsData: FoodItem[] = await myFoodsRes.json();
          setMyFoodItems(myItemsData);
        }

        if (appliedFoodsRes.ok) {
          const appliedFoodsData: FoodItem[] = await appliedFoodsRes.json();
          setAppliedFoodItems(appliedFoodsData);
        }
      } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error); // ★エラー内容を詳しく表示
        // エラーハンドリング: トークン切れなどでログインページに飛ばすなど
        if (error instanceof Error && (error.message.includes('401') || error.message.includes('Failed to fetch'))) {
            logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, logout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  console.log('現在のuser state:', user); // ★デバッグ用ログを追加

  // トグルされた時の親の状態更新関数
  const handleToggleAvailability = (itemId: number, newAvailability: boolean) => {
    setMyFoodItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, is_available: newAvailability } : item
      )
    );
  };

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
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            ホームページに戻る
          </button>
          <button
            onClick={logout}
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
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover"/>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                      画像なし
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    {/* 期限の表示 この書き方だとyyyy/mm/ddの形式になる */}
                    {item.expiration_date && (
                      <p className="text-red-500 font-semibold">
                        この商品の期限は{new Date(item.expiration_date).toLocaleDateString()}です
                      </p>
                    )}
                    <ToggleAvailabilityButton item={item} onToggle={handleToggleAvailability} />
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