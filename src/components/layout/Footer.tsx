import '../../css/footer.css';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>FoodShare</h3>
          <p>食品ロスを減らし、みんなでシェアする</p>
          <p>持続可能な社会を目指しています</p>
        </div>
        
        <div className="footer-section">
          <h4>サービス</h4>
          <ul>
            <li><a href="#top">トップ</a></li>
            <li><a href="#services">サービス</a></li>
            <li><a href="#vision">ビジョン</a></li>
            <li><a href="#contact">お問い合わせ</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>ご利用について</h4>
          <ul>
            <li><a href="#terms">利用規約</a></li>
            <li><a href="#privacy">プライバシーポリシー</a></li>
            <li><a href="#food-safety">食品安全について</a></li>
            <li><a href="#guidelines">シェアガイドライン</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>フォローする</h4>
          <div className="social-links">
            <a href="#" className="social-link">
              <span className="material-icons">facebook</span>
            </a>
            <a href="#" className="social-link">
              <span className="material-icons">alternate_email</span>
            </a>
            <a href="#" className="social-link">
              <span className="material-icons">chat</span>
            </a>
          </div>
          <div className="contact-info">
            <p>📧 info@foodshare.com</p>
            <p>📞 01-234-5678</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 FoodShare. All rights reserved.</p>
          <div className="important-notice">
            <p>⚠️ 食品の品質・安全性は提供者の責任です。受け取り前に必ず確認してください。</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;