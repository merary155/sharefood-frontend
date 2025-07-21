import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // トークンの有無で認証状態を判断

  // 認証されていれば子ルート（<Outlet />）を表示、そうでなければログインページにリダイレクト
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;