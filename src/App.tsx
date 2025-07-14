import Header from './components/header'
import Hero from './components/hero'
import Main from './components/main'
import Footer from './components/footer'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { ModalState } from './types';

// スタイル付きコンポーネントを定義（これは将来的に削除）
const StatusText = styled.p`
  text-align: center;
  color: #888;
  font-style: italic;
`;

const App: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, tab: 'login' });
  const [backendStatus, setBackendStatus] = useState('Checking backend status...');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/v1/status')
      .then(response => {
        // response.ok はレスポンスが成功（200〜299）かどうかを判定する真偽値
        // エラーがあればthrowでcatchに飛ぶ
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // returnは本来関数の終了を意味するが、
        // Promiseチェーンの中では次の.thenへの値の受け渡し（橋渡し）にもなる
        return response.json();
      })
      // dataはオブジェクトで、keyが'message'、値はstring型
      .then((data: { message: string }) => {
        setBackendStatus(data.message);
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
      {/* ↓これは将来的に削除 */}
      <StatusText>{backendStatus}</StatusText>
      <Footer />
    </>
  )
}

export default App;
