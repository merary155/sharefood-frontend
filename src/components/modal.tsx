import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPassword from './ForgotPassword';

// タブの状態を表す型
export type ActiveTab = 'login' | 'register' | 'forgot';

// コンポーネントのPropsの型
// voidだけだと戻り値無し、()=>void で引数・戻り値無しにできる
// (引数名: 型) => 戻り値の型
interface ModalProps {
  onClose: () => void;
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void; // 引数有・その引数の型をActiveTabにする
}

const Modal: React.FC<ModalProps> = ({ onClose, activeTab, onChangeTab }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* オーバーレイをクリックするとモーダルを閉じる */}
      <div className="modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {/* e.stopPropagationを入れて、モーダルをクリックしたときにオーバーレイ関数が動かないようにする */}
        <nav className="modal-nav">
          <button onClick={() => onChangeTab('login')} className={activeTab === 'login' ? 'active' : ''}>ログイン</button>
          <button onClick={() => onChangeTab('register')} className={activeTab === 'register' ? 'active' : ''}>会員登録</button>
          <button onClick={() => onChangeTab('forgot')} className={activeTab === 'forgot' ? 'active' : ''}>パスワードを忘れた方はこちら</button>
        </nav>
        <div className="modal-content">
          {activeTab === 'login' && <LoginForm />}
          {activeTab === 'register' && <RegisterForm />}
          {activeTab === 'forgot' && <ForgotPassword />}
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Modal;
