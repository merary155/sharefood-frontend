import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import ForgotPassword from './ForgotPassword.tsx';

export default function Modal({onClose, activeTab, onChangeTab }) {

  return (
    <div className="modal-overlay" onClick={onClose}> 
      {/* オーバーレイをクリックするとモーダルを閉じる */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* e.stopPropagationを入れて、モーダルをクリックしたときにオーバーレイ関数が動かないようにする */}
        <nav className="modal-nav">
          <button onClick={() => onChangeTab('login')} className={activeTab === 'login' ? 'active' : ''}>ログイン</button>
          <button onClick={() => onChangeTab('register')} className={activeTab === 'register' ? 'active' : ''}>会員登録</button>
          <button onClick={() => onChangeTab('forgot')} className={activeTab === 'forgot' ? 'active' : ''}>パスワードを忘れた方はこちら</button>
        </nav>
        <div className="modal-content">
          {/* 変数modalTabがそれぞれの値と一致すれば右の関数が動く */}
          {activeTab === 'login' && <LoginForm />}
          {activeTab === 'register' && <RegisterForm />}
          {activeTab === 'forgot' && <ForgotPassword />}
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}
