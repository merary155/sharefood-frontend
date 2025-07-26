import React from 'react';
import { useForm } from '../../hooks/useForm';
import { validateLogin } from '../../utils/Validation';
import { LoginValues } from '../../interface/auth';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  // useFormフックがジェネリックであると仮定し、<LoginValues>を渡して型を適用
  const { values, errors, handleChange, validateForm } = useForm<LoginValues>(
    { email: '', password: '' },
    validateLogin
  );

  // e専用の型チェック
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: サーバーにデータを送信する処理をここに実装 (例: fetch/axios)
      try {
        const res = await fetch('/api/v1/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email_address: values.email,  // サーバー側が期待するキー名に修正
            password: values.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          // サーバーからのエラーメッセージをthrow
          throw new Error(data.message || 'ログインに失敗しました');
        }

        if (!data.access_token) {
          throw new Error('アクセストークンが取得できません');
        }

        localStorage.setItem('token', data.access_token); 

        onLoginSuccess(); // 親コンポーネントにログイン成功を通知

      } catch (error: any) {
        console.error('ログインエラー:', error);
        alert(error.message || 'ログインに失敗しました。もう一度お試しください。');
      }
    }
  };

  return (
    // noValidate属性により、ブラウザ標準のバリデーションを無効化し、カスタムバリデーションを優先
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="login-email">メールアドレス</label>
      <input
        id="login-email"
        name="email"
        type="email"
        placeholder="メールアドレス"
        value={values.email}
        onChange={handleChange}
        autoComplete="email"
      />
      {/* 
      errors が undefined または null の場合でも安全にアクセスできるように、  
      オプショナルチェイニング（?.）を使っている。  
      また、errors.email が空文字 '' や undefined の場合は何も表示しないための条件判定も兼ねている
      */}
      {errors?.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <label htmlFor="login-password">パスワード</label>
      <input
        id="login-password"
        name="password"
        type="password"
        placeholder="パスワード"
        value={values.password}
        onChange={handleChange}
        autoComplete="current-password"
      />
      {/* 上に書いたコメントと同様 */}
      {errors?.password && <p style={{ color: 'red' }}>{errors.password}</p>} 

      <button type="submit">ログイン</button>
    </form>
  );
}

export default LoginForm;
