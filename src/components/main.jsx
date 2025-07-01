import '../css/main.css';
import React,{useState} from 'react';

export default function Main(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('login');  //login,register,forgot

  return(
    <main>
      <section>
        <div className='btn-container'>
          <button className='register-btn' onClick={()=> {setIsModalOpen(true); setModalTab('register');}}>会員登録はこちら</button>
          <button className='login-btn' onClick={()=> setIsModalOpen(true)}>ログインはこちら</button>
        </div>
        <p>会員登録するとサービスをご利用いただけます</p>

        {isModalOpen && (
          <div className="modal-overlay" onClick={()=> setIsModalOpen(false)}>
            {/* e.stopPropagationを入れて、モーダルをクリックしたときにオーバーレイ関数が動かないようにする */}
            <div className="modal" onClick={(e)=> e.stopPropagation()}> 
              <nav className="modal-nav">
                <button onClick={() => setModalTab('login')} className={modalTab === 'login' ? 'active' : ''}>ログイン</button>
                <button onClick={() => setModalTab('register')} className={modalTab === 'register' ? 'active' : ''}>会員登録</button>
                <button onClick={() => setModalTab('forgot')} className={modalTab === 'forgot' ? 'active' : ''}>パスワードを忘れた方はこちら</button>
              </nav>
              <div className="modal-content">
                {/* 変数modalTabがそれぞれの値と一致すれば右の関数が動く */}
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

export function LoginForm(){
  return(
    <form>
      <h2>ログイン</h2>
      <input type='email' placeholder='メールアドレスを入力してください' required />
      <input type='password' placeholder='パスワードを入力してください' required />
      <button type='submit'>ログイン</button>
    </form>
  );
}

export function RegisterForm() {
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

export function ForgotPassword() {
  return (
    <form>
      <h2>パスワードを忘れた方</h2>
      <input type="email" placeholder="登録メールアドレス" required />
      <button type="submit">送信</button>
    </form>
  );
}

