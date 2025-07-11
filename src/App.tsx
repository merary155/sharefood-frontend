import './App.css'
import Header from './components/header'
import Hero from './components/hero'
import Main from './components/main'
import Footer from './components/footer'
import React, { useState } from 'react';

export default function App() {
  const [modalState, setModalState] = useState({ isOpen: false, tab: 'login' });

  const handlePersonClick = () => {
    setModalState({ isOpen: true, tab: 'register' });
  };

  return (
    <>
      <Header onPersonClick={handlePersonClick} />   {/* ここで親から子にpropsを譲渡 */}
      <Hero />
      <Main modalState={modalState} setModalState={setModalState} /> {/* ここで親から子にpropsを譲渡 */}
      <Footer />
    </>
  )
}
