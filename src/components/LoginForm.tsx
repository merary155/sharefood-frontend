import React from 'react';
import { useForm } from '../hooks/useForm';
import { validateLogin } from '../utils/validation';

// フォームで扱う値の型を定義
interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  // useFormフックがジェネリックであると仮定し、<FormValues>を渡して型を適用
  const { values, errors, handleChange, validateForm } = useForm<FormValues>(
    { email: '', password: '' },
    validateLogin
  );

  // イベントハンドラの引数 `e` に型を付けます
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('ログイン送信:', values);
      // TODO: サーバーにデータを送信する処理をここに実装 (例: fetch/axios)
    }
  };

  return (
    // noValidate属性により、ブラウザ標準のバリデーションを無効化し、カスタムバリデーションを優先
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="login-email">メールアドレス</label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="メールアドレス"
          value={values.email}
          onChange={handleChange}
        />
        {/* オプショナルチェイニング(?.)で、errorsオブジェクトが存在しなくてもエラーを防止 */}
        {errors?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="login-password">パスワード</label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="パスワード"
          value={values.password}
          onChange={handleChange}
        />
        {errors?.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <button type="submit">ログイン</button>
    </form>
  );
}