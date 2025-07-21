import React from 'react';
import { useForm } from '../hooks/useForm';
import { validateRegister } from '../utils/validation';
import { useNavigate } from 'react-router-dom';

// フォームの値の型を定義
interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const { values, errors, handleChange, validateForm } = useForm<FormValues>(
    { name: '', email: '', password: '' },
    validateRegister
  );
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // バックエンドのスキーマに合わせてキー名をマッピング
      const dataToSend = {
        username: values.name,
        email_address: values.email,
        password: values.password,
      };

      console.log('登録送信:', dataToSend);

      try {
        // バックエンドの登録APIエンドポイントを呼び出す
        const res = await fetch('/api/v1/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        // 先にレスポンスをJSONとしてパース
        const data = await res.json();

        if (!res.ok) {
          // サーバーからのエラーメッセージがあればそれを使用
          throw new Error(data.message || '会員登録に失敗しました');
        }

        alert(data.message || '会員登録が完了しました！ログインページに移動します。');
        // 登録成功後はログインページに遷移させるのが一般的
        navigate('/login');
      } catch (error: any) {
        console.error('登録エラー:', error);
        // JSONパースエラーなども考慮し、汎用的なメッセージを表示
        if (error instanceof SyntaxError) {
          alert('サーバーからの応答が無効です。時間をおいて再度お試しください。');
        } else {
          alert(error.message || '会員登録中にエラーが発生しました。');
        }
      }
    }
  };

  return (
    // noValidateでhtmlの標準バリデーションを無効、handleSubmitのみを有効にする
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="register-name">お名前</label>
      <input
        id="register-name"
        name="name"
        type="text"
        placeholder="田中 太郎"
        value={values.name}
        onChange={handleChange}
        autoComplete="name"
      />
      {errors?.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <label htmlFor="register-email">メールアドレス</label>
      <input
        id="register-email"
        name="email"
        type="email"
        placeholder="メールアドレス"
        value={values.email}
        onChange={handleChange}
        autoComplete="email"
      />
      {errors?.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <label htmlFor="register-password">パスワード</label>
      <input
        id="register-password"
        name="password"
        type="password"
        placeholder="8文字以上・大文字・小文字・数字を含む"
        value={values.password}
        onChange={handleChange}
        autoComplete="new-password"
      />
      {errors?.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      <button type="submit">登録</button>
    </form>
  );
};

export default RegisterForm;