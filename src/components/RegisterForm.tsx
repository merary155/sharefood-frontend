import React from 'react';
import { useForm } from '../hooks/useForm';
import { validateRegister } from '../utils/validation';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('登録送信:', values);
      // ここでAPI送信などの処理
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