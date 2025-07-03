import React, { useState, useEffect } from 'react';
import '../css/header.css';

function Header({ onPersonClick }){
  const menuItems = ['トップ','サービス','ビジョン','ご連絡はこちら']
  const [shrink, setShrink] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // メニューの開閉状態を管理

  useEffect(() => {
    const handleScroll = () => {
      // window.scrollY > 50 の結果 (true/false) を直接セットする方が簡潔です
      setShrink(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // メニューの開閉を切り替える関数
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return(
    // isMenuOpenの状態に応じてクラスを追加
    <header className={`header ${shrink ? 'shrink' : ''} ${isMenuOpen ? 'menu-opened' : ''}`}>
      <div className='header-container'>
        <a href="#" className='header-logo'>ShareFood</a>
        <nav>
          {/* isMenuOpenの状態に応じてクラスを追加 */}
          <ul className={`menu-list ${isMenuOpen ? 'open' : ''}`}>
            {menuItems.map((item,index)=>(
              <li key={index}>
                {/* メニュー項目をクリックしたらメニューが閉じるようにする */}
                <a href='#' onClick={() => setIsMenuOpen(false)}>{item}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className='mark' onClick={onPersonClick}>
          <span className="material-icons">person</span>
        </div>
        {/* ハンバーガーメニューボタン (スマホでのみ表示) */}
        <button className="hamburger-menu" onClick={toggleMenu} aria-label="メニューを開閉する">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;