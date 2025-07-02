import React from 'react';
import { useForm } from '../hooks/useForm.jsx';
import { validateRegister } from '../utils/validation.jsx';

export default function RegisterForm() {
  const { values, errors, handleChange, validateForm } = useForm(
    { name: '', email: '', password: '' },
    validateRegister
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('登録送信:', values);
      // ここでAPI送信などの処理
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="田中 太郎"
        value={values.name}
        onChange={handleChange}
        required
      />
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <input
        name="email"
        type="email"
        placeholder="メールアドレスを入力してください"
        value={values.email}
        onChange={handleChange}
        required
      />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <input
        name="password"
        type="password"
        placeholder="8文字以上・大文字・小文字・数字を1文字以上組み合わせてください"
        value={values.password}
        onChange={handleChange}
        required
      />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      <button type="submit">登録</button>
    </form>
  );
}