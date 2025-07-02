import '../css/main.css';
import React from 'react';

export default function Main({ modalState, setModalState }){ //親から受け取ったpropsを分割代入
  const { isOpen: isModalOpen, tab: modalTab } = modalState;
  
  const setIsModalOpen = (open) => {
    setModalState(prev => ({ ...prev, isOpen: open }));
  };
  
  const setModalTab = (tab) => {
    setModalState(prev => ({ ...prev, tab }));
  };

  return(
    <main>
      <section>
        <div className='btn-container'>
          <button className='register-btn' onClick={()=> {setIsModalOpen(true); setModalTab('register');}}>会員登録はこちら</button>
          <button className='login-btn' onClick={()=> {setIsModalOpen(true); setModalTab('login');}}>ログインはこちら</button>
        </div>
        <p>会員登録するとサービスをご利用いただけます</p>
      </section>

      {/* フローセクション */}
      <section className="flow-section">
        <h2>ご利用の流れ</h2>
        <div className="flow-container">
          <div className="flow-card giver-flow">
            <h3>🎁 譲渡する方</h3>
            <div className="flow-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>会員登録</h4>
                  <p>簡単な登録で始めましょう</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>商品の在庫を掲載</h4>
                  <p>余った食品を写真と共に投稿</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>マッチング</h4>
                  <p>受け取り希望者とのマッチング</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>譲渡</h4>
                  <p>約束の場所で安全にお渡し</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flow-card receiver-flow">
            <h3>🤝 受け取る方</h3>
            <div className="flow-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>会員登録</h4>
                  <p>簡単な登録で始めましょう</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>商品を検索</h4>
                  <p>欲しい食品を検索して見つける</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>マッチング</h4>
                  <p>譲渡者とのマッチング成立</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>受け取りに行く</h4>
                  <p>約束の場所で食品を受け取り</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="features-section">
        <h2>FoodShareの特徴</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>安心・安全</h3>
            <p>会員制で安心できる取引環境を提供します</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>簡単操作</h3>
            <p>直感的なインターフェースで誰でも簡単に利用できます</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>環境貢献</h3>
            <p>食品ロスを減らして持続可能な社会に貢献します</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>無料利用</h3>
            <p>基本機能は全て無料でご利用いただけます</p>
          </div>
        </div>
      </section>

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
      <input type="text" placeholder="田中　太郎" required />
      <input type="email" placeholder="メールアドレスを入力してください" required />
      <input type="password" placeholder="パスワードを入力してください" required />
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

