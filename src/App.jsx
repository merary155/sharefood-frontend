import './App.css'
import Header from './components/header.jsx'
import Hero from './components/hero.jsx'
import Main from './components/main.jsx'
import React, { useState } from 'react';

export default function App() {
  const [modalState, setModalState] = useState({ isOpen: false, tab: 'login' });

  const handlePersonClick = () => {
    setModalState({ isOpen: true, tab: 'register' });
  };

  return (
    <>
      <Header onPersonClick={handlePersonClick} />
      <Hero />
      <Main modalState={modalState} setModalState={setModalState} />
    </>
  )
}
