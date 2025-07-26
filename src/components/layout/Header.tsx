import React, { useState, useEffect } from 'react';
import '../../css/header.css';

// propsの型定義をinterfaceで
interface HeaderProps {
  onPersonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPersonClick }) => {
  const menuItems: string[] = ['トップ', 'サービス', 'ビジョン', 'ご連絡はこちら'];
  const [shrink, setShrink] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // メニューの開閉状態を管理

  useEffect(() => {
    const handleScroll = () => {
      // window.scrollY軸が50pxを超えていればtrueになる
      setShrink(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // メニューの開閉を切り替える関数
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // isMenuOpenの状態に応じてクラスを追加
    <header className={`header ${shrink ? 'shrink' : ''} ${isMenuOpen ? 'menu-opened' : ''}`}>
      <div className="header-container">
        <a href="#" className="header-logo">ShareFood</a>
        <nav>
          {/* isMenuOpenの状態に応じてクラスを追加 */}
          <ul className={`menu-list ${isMenuOpen ? 'open' : ''}`}>
            {menuItems.map((item, index) => (
              <li key={index}>
                {/* メニュー項目をクリックしたらメニューが閉じるようにする */}
                <a href="#" onClick={() => setIsMenuOpen(false)}>{item}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mark" onClick={onPersonClick}>
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
};

export default Header;