import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Hero from '../components/layout/Hero';
import Main from '../components/home/Main';
import Footer from '../components/layout/Footer';
import type { ModalState } from '../interface/types';
import UserPanel from '../components/home/UserPanel';
import useAuthToken from '../components/auth/useAuthToken';

interface HomePageProps {
  modalState: ModalState;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  backendStatus: string;
}

const HomePage: React.FC<HomePageProps> = ({ modalState, setModalState, backendStatus }) => {
  const navigate = useNavigate();
  const { user, logout, fetchUser } = useAuthToken();

  // モーダルを開く関数（ログインボタン用）
  const handlePersonClick = useCallback(() => {
    setModalState({ isOpen: true, tab: 'login' });
  }, [setModalState]);

  // ログインしていればマイページに遷移、ログインしていなければモーダルウィンドウに誘導
  const handleLoginOrRedirect = useCallback(() => {
    if(user){
      navigate('/app/dashboard');
    }else{
      handlePersonClick();
    }
  }, [user, handlePersonClick]);

  // ログイン成功時に呼ばれるコールバック関数
  const handleLoginSuccess = useCallback(() => {
    setModalState({ isOpen: false, tab: 'login' }); 
    fetchUser();
  },[fetchUser, setModalState]);
  
  return (
    <>
      <Header onPersonClick={handleLoginOrRedirect} />
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