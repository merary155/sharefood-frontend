import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Hero from '../components/layout/Hero';
import Main from '../components/home/Main';
import Footer from '../components/layout/Footer';
import useLogout from '../components/auth/Logout';
import type { ModalState, User } from '../interface/types';
import UserPanel from '../components/home/UserPanel';

interface HomePageProps {
  modalState: ModalState;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  backendStatus: string;
}

const HomePage: React.FC<HomePageProps> = ({ modalState, setModalState, backendStatus }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User|null>(null); // 初期値null、型は'User or null'
  const logout = useLogout(setUser);

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
      <UserPanel 
        onLogout={logout}
        user={user}
        onNavigate={navigate}
      />
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