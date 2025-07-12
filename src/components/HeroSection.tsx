import React from 'react';

// Mainから渡される関数をpropsとして受け取る


const HeroSection = ({ onRegisterClick, onLoginClick }) => {
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