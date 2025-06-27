import React, { useState, useEffect } from 'react';
import '../css/header.css';

function Header(){
  const menuItems = ['トップ','サービス','ビジョン','ご連絡はこちら']
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 50) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return(
    <header className={`header ${shrink ? 'shrink' : ''}`}>
      <div className='header-container'>
        <div className='header-logo'>logo</div>
        <nav>
          <ul className='menu-list'>
            {menuItems.map((item,index)=>(
              <li key={index}>
                <a href='#'>{item}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className='mark' onClick={() => window.location.href = '/signup'}>
          <span className="material-icons">person</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
