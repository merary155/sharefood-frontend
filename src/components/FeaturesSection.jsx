import React from 'react';

// 特徴のデータを配列として定義
const features = [
  { icon: '🛡️', title: '安心・安全', description: '会員制で安心できる取引環境を提供します' },
  { icon: '📱', title: '簡単操作', description: '直感的なインターフェースで誰でも簡単に利用できます' },
  { icon: '🌱', title: '環境貢献', description: '食品ロスを減らして持続可能な社会に貢献します' },
  { icon: '💰', title: '無料利用', description: '基本機能は全て無料でご利用いただけます' },
];

// 単一の特徴カードを描画する小さなコンポーネント
const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2>FoodShareの特徴</h2>
      <div className="features-grid">
        {features.map(feature => (  //ここで配列を展開
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default React.memo(FeaturesSection);