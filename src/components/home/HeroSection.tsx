import React from 'react';

// Propsの型を定義
interface HeroSectionProps {
  onRegisterClick: () => void;
  onLoginClick: () => void;
  user: { id: number; username: string } | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick, onLoginClick, user }) => {
  if (user) {
    // ログイン済ならボタン非表示にして挨拶だけ表示する例
    return (
      <>
      </>
    );
  }

  // ログインしていなければボタン表示
  return (
    <section>
      <div className='btn-container'>
        <button className='register-btn' onClick={onRegisterClick}>会員登録はこちら</button>
        <button className='login-btn' onClick={onLoginClick}>ログインはこちら</button>
      </div>
      <p>会員登録するとサービスをご利用いただけます</p>
    </section>
  );
};
export default React.memo(HeroSection);