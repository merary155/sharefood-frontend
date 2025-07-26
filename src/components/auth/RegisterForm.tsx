import React from 'react';
import { useForm } from '../../hooks/useForm';
import { validateRegister } from '../../utils/Validation';
import { useNavigate } from 'react-router-dom';
import { RegisterValues } from '../../interface/auth';

const RegisterForm: React.FC = () => {
  const { values, errors, handleChange, validateForm } = useForm<RegisterValues>(
    { name: '', email: '', password: '', passwordConfirm: '' },
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
      <div className="mb-4">
        <label htmlFor="register-name" className="block text-gray-700 text-sm font-bold mb-2">お名前</label>
        <input
          id="register-name"
          name="name"
          type="text"
          placeholder="田中 太郎"
          value={values.name}
          onChange={handleChange}
          autoComplete="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors?.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="register-email" className="block text-gray-700 text-sm font-bold mb-2">メールアドレス</label>
        <input
          id="register-email"
          name="email"
          type="email"
          placeholder="メールアドレス"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors?.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="register-password" className="block text-gray-700 text-sm font-bold mb-2">パスワード</label>
        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="8文字以上・大文字・小文字・数字を含む"
          value={values.password}
          onChange={handleChange}
          autoComplete="new-password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors?.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="register-password-confirm" className="block text-gray-700 text-sm font-bold mb-2">パスワード（確認用）</label>
        <input
          id="register-password-confirm"
          name="passwordConfirm"
          type="password"
          placeholder="パスワードを再入力"
          value={values.passwordConfirm}
          onChange={handleChange}
          autoComplete="new-password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors?.passwordConfirm && <p className="text-red-500 text-xs italic">{errors.passwordConfirm}</p>}
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
        登録
      </button>
    </form>
  );
};

export default RegisterForm;