import React, { useCallback } from 'react';
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

const HomePage: React.FC<HomePageProps> = ({ modalState, setModalState, backendStatus }) => {
  const handlePersonClick = useCallback(() => {
    setModalState({ isOpen: true, tab: 'login' });
  }, [setModalState]);

  return (
    <>
      <Header onPersonClick={handlePersonClick} />
      <Hero />
      <Main modalState={modalState} setModalState={setModalState} />
      {/* StatusTextはApp.tsxから移動しても良いし、必要なければ削除してもOK */}
      <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
        {backendStatus}
      </p>
      <Footer />
    </>
  );
};

export default HomePage;