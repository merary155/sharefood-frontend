import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { ModalState } from './types';

// ページコンポーネントをインポート
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // 前回作成したDashboardPage
import PrivateRoute from './components/PrivateRoute'; // 前回作成したPrivateRoute

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

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage modalState={modalState} setModalState={setModalState} backendStatus={backendStatus} />}
      />
      <Route
        path="/login"
        element={<LoginPage setModalState={setModalState} />}
      />
      {/* ↓ 認証が必要なルート */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
