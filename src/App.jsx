import './App.css'
import Header from './components/header.jsx'
import Hero from './components/hero.jsx'
import Main from './components/main.jsx'
import Footer from './components/footer.jsx'
import React, { useState, useEffect } from 'react';

export default function App() {
  const [modalState, setModalState] = useState({ isOpen: false, tab: 'login' });
  const [backendStatus, setBackendStatus] = useState('Checking backend status...');

  // useEffectフックを追加
  // このフックはコンポーネントが最初にマウントされた時に一度だけ実行される
  useEffect(() => {
    // Flask APIのエンドポイントにリクエストを送信
    fetch('http://127.0.0.1:5000/api/v1/status')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBackendStatus(data.message); // APIから受け取ったメッセージでstateを更新
      })
      .catch(error => setBackendStatus('Failed to connect to backend.'));
  }, []); // 第2引数の空の配列は「初回のみ実行」を意味する

  const handlePersonClick = () => {
    setModalState({ isOpen: true, tab: 'register' });
  };

  return (
    <>
      <Header onPersonClick={handlePersonClick} />   {/* ここで親から子にpropsを譲渡 */}
      <Hero />
      <Main modalState={modalState} setModalState={setModalState} /> {/* ここで親から子にpropsを譲渡 */}
      <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>{backendStatus}</p>
      <Footer />
    </>
  )
}
