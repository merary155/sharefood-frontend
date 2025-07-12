import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: パスワードリセットAPIの呼び出しロジックをここに実装
    console.log('Password reset request for:', email);
    alert('パスワード再設定用のメールを送信しました。');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>パスワードを忘れた方</h2>
      <label htmlFor="forgot-password-email" style={{ display: 'none' }}>登録メールアドレス</label>
      {/* 
      htmlForとidが紐づく
      見た目は隠しておくがスクリーンリーダー等には識別される 
      */}
      <input
        id="forgot-password-email"
        name="email"
        type="email"
        placeholder="登録メールアドレス"
        autoComplete="email"
        value={email}
        // e.target はイベントが発生した要素（ここではinputタグ）を指す
        // e.target.value はそのinputの現在の値（ユーザーが入力したテキスト）
        // onChangeの役目はユーザーの入力をリアルタイムで更新すること
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">送信</button>
    </form>
  );
};

export default ForgotPassword;