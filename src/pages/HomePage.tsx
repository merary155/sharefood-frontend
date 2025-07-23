import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Hero from '../components/hero';
import Main from '../components/main';
import Footer from '../components/footer';
import Modal from '../components/modal';
import type { ModalState, ActiveTab } from '../types';

interface HomePageProps {
  modalState: ModalState;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  backendStatus: string;
}

interface User{
  id: number;
  username: string;
}

const HomePage: React.FC<HomePageProps> = ({ modalState, setModalState, backendStatus }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User|null>(null); // 初期値null、型は'User or null'

  // モーダルを開く関数（ログインボタン用）
  const handlePersonClick = useCallback(() => {
    setModalState({ isOpen: true, tab: 'login' });
  }, [setModalState]);

  // 初回マウント時のみログイン状態をチェックする
  useEffect(() => {
    const token = localStorage.getItem('token');
    // トークンがあれば、ユーザー情報取得APIを呼ぶ
    if(token){
      fetch('/api/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        // レスポンスが正常でなければエラーを投げる
        if (!res.ok) throw new Error('認証エラー');
        // 正常ならdataが返ってくる、また"res.json()"は引数なしで使う
        return res.json();
      })
      // パースしたユーザーデータをstateにセット
      .then(data => setUser(data))
      // エラー発生時はトークンを削除し、ユーザー情報をnullにする
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
    }
  },[]);
  
  return (
    <>
      <Header onPersonClick={handlePersonClick} />
      <Hero />
      {/* ★ ユーザーがログインしていたら表示するブロック */}
      {user && (
        <div className="text-center my-6">
          <p className="text-xl font-semibold">{user.username} 様、ようこそ！</p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => navigate('/app/register-food')}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
            >
              商品登録はこちら
            </button>
            <button
              onClick={() => navigate('/app/search')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
            >
              商品検索はこちら
            </button>
          </div>
        </div>
      )}
      <Main modalState={modalState} setModalState={setModalState} />
      <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
        {backendStatus}
      </p>
      <Footer />
    </>
  );
};

export default HomePage;