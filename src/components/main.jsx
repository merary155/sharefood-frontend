import '../css/main.css';
import React,{useState,useEffect} from 'react';

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('login'); // login, register, forgot

  return (
    <main>
      <section>
        <button className='subscript'>会員登録はこちら</button>
        <button className='login-btn' onClick={() => setIsModalOpen(true)}>ログインはこちら</button>
        <p>会員登録するとサービスをご利用いただけます</p>

        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <nav className="modal-nav">
                <button onClick={() => setModalTab('login')} className={modalTab === 'login' ? 'active' : ''}>ログイン</button>
                <button onClick={() => setModalTab('register')} className={modalTab === 'register' ? 'active' : ''}>会員登録</button>
                <button onClick={() => setModalTab('forgot')} className={modalTab === 'forgot' ? 'active' : ''}>パスワードを忘れた方はこちら</button>
              </nav>

              <div className="modal-content">
                {modalTab === 'login' && <LoginForm />}
                {modalTab === 'register' && <RegisterForm />}
                {modalTab === 'forgot' && <ForgotPassword />}
              </div>

              <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function LoginForm() {
  return (
    <form>
      <h2>ログイン</h2>
      <input type="email" placeholder="メールアドレス" required />
      <input type="password" placeholder="パスワード" required />
      <button type="submit">ログイン</button>
    </form>
  );
}

function RegisterForm() {
  return (
    <form>
      <h2>会員登録</h2>
      <input type="text" placeholder="名前" required />
      <input type="email" placeholder="メールアドレス" required />
      <input type="password" placeholder="パスワード" required />
      <button type="submit">登録</button>
    </form>
  );
}

function ForgotPassword() {
  return (
    <form>
      <h2>パスワードを忘れた方</h2>
      <input type="email" placeholder="登録メールアドレス" required />
      <button type="submit">送信</button>
    </form>
  );
}
