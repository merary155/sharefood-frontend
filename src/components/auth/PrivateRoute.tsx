import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  // 三項演算子で明確に判定するため、
  // Truthy / Falsy の値を true / false の Boolean に変換する
  const isAuthenticated = !!localStorage.getItem('token'); 

  // 認証されていれば子ルート（<Outlet />）を表示、そうでなければログインページにリダイレクト
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;