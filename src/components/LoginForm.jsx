import React from 'react';
import { useForm } from '../hooks/useForm.jsx'; 
import { validateLogin } from '../utils/validation.jsx'; 

export default function LoginForm() {
  const { values, errors, handleChange, validateForm } = useForm(
    { email: '', password: '' },
    validateLogin
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('ログイン送信:', values);
      // サーバーに送る処理を書く場所（fetch/axiosなど）
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        placeholder="メールアドレス"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <input
        name="password"
        type="password"
        placeholder="パスワード"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      <button type="submit">ログイン</button>
    </form>
  );
}