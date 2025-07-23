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

  // ログイン成功時に呼ばれるコールバック関数
  const handleLoginSuccess = useCallback(() => {
    setModalState({ isOpen: false, tab: 'login' }); // 先にモーダルを閉じる
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (!res.ok) throw new Error('認証エラー');
        return res.json();
      })
      .then(data => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
    }
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
      .then(data => setUser(data.user)) 
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
        <div className="mt-10 text-center my-6">
          <p className="text-3xl font-extrabold text-gray-800 tracking-wide leading-relaxed drop-shadow-sm">
            {user.username} 様、ようこそ！
          </p>
          <div className="mt-20 flex justify-center gap-10">
            <button
              onClick={() => navigate('/app/register-food')}
              className="bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300"
            >
              商品登録はこちら
            </button>
            <button
              onClick={() => navigate('/app/search')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300"
            >
              商品検索はこちら
            </button>
          </div>
        </div>
      )}
      <Main 
        modalState={modalState} 
        setModalState={setModalState} 
        onLoginSuccess={handleLoginSuccess}
        user={user}
      />
      <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
        {backendStatus}
      </p>
      <Footer />
    </>
  );
};

export default HomePage;