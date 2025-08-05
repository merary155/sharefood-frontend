import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const [message, setMessage] = useState('認証中です');
  const [status, setStatus] = useState('loading');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if(!token){
      setMessage('認証トークンがありません。URLが正しいか確認してください。');
      setStatus('error');
      return;
    }

    fetch(`/api/v1/verify-email?token=${token}`)
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if(ok){
          setMessage('メールアドレスが正常に認証されました。ログインページに移動します。');
          setStatus('success');

          // 2秒後にLoginPageに遷移
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }else{
          setMessage(data.message || '認証に失敗しました。'); // "||"は or の役目
          setStatus('error');
        }
      })
      .catch(() => {
        setMessage('サーバーとの通信に失敗しました。');
        setStatus('error');
      });
  }, []);

  return(
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">メール認証</h1>
        {status === 'loading' && (
          <p className="text-gray-500 text-lg animate-pulse">認証中です…</p>
        )}
        {status === 'success' && (
          <p className="text-green-600 text-lg font-semibold">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-lg font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};