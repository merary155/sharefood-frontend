import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ModalState } from '../types';

interface LoginPageProps {
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setModalState }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setModalState({ isOpen: true, tab: 'login' });
    navigate('/', { replace: true }); // ホームにリダイレクト
  }, [setModalState, navigate]);

  return null; // このコンポーネント自体は何も表示しない
};

export default LoginPage;