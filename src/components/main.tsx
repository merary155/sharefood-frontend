import React, { useCallback } from 'react';
import '../css/main.css';
import Modal from './modal';
import FlowSection from './FlowSection';
import FeaturesSection from './FeaturesSection';
import HeroSection from './HeroSection';

// 親から受け取ったpropsの型を定義
interface ModalState {
  isOpen: boolean;
  tab: string;
}

interface MainProps {
  modalState: ModalState;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}

export default function Main({ modalState, setModalState }: MainProps) { //親から受け取ったpropsを分割代入
  const { isOpen: isModalOpen, tab: modalTab } = modalState;

  // HeroSectionに渡す関数もuseCallbackでメモ化する
  const handleRegisterClick = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: true, tab: 'register' }));
  }, [setModalState]);

  const handleLoginClick = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: true, tab: 'login' }));
  }, [setModalState]);

  // Modalに渡す関数をuseCallbackでメモ化し、不要な再レンダリングを防ぐ
  // setModalStateが変更されない限り、これらの関数は再生成されない
  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, [setModalState]);

  const changeTab = useCallback((tab: string) => {
    setModalState(prev => ({ ...prev, tab }));
  }, [setModalState]);

  return(
    <main>
      <HeroSection
        onRegisterClick={handleRegisterClick}
        onLoginClick={handleLoginClick}
      />

      <FlowSection />
      <FeaturesSection />
      
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          activeTab={modalTab}
          onChangeTab={changeTab}
        />
      )}
    </main>
  );
}
