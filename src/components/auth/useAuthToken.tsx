import { useState, useEffect, useCallback } from 'react';
import type { User } from '../../interface/types'; // 必要に応じて型をインポート
import useLogout from './Logout';

export default function useAuthToken() {
  const [user, setUser] = useState<User | null>(null); // 初期値null、型は'User or null'

  // ユーザー情報を取得する関数（ログイン成功時や初回読み込みで使用）
  const fetchUser = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('認証エラー');
        // 正常ならdataが返ってくる、また"res.json()"は引数なしで使う
        return res.json();
      })
      .then(data => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
  }, []);

  // 初回マウント時にユーザー情報を取得
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ログアウト
  const logout = useLogout(setUser);

  return { user, fetchUser, logout };
}
