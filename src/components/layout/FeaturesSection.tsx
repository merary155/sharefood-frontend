import React from 'react';

// 特徴のデータ型を定義
interface Feature {
  id: number; 
  icon: string;
  title: string;
  description: string;
}

// 特徴のデータを配列として定義
const features: Feature[] = [
  { id: 1, icon: '🛡️', title: '安心・安全', description: '会員制で安心できる取引環境を提供します' },
  { id: 2, icon: '📱', title: '簡単操作', description: '直感的なインターフェースで誰でも簡単に利用できます' },
  { id: 3, icon: '🌱', title: '環境貢献', description: '食品ロスを減らして持続可能な社会に貢献します' },
  { id: 4, icon: '💰', title: '無料利用', description: '機能は全て無料でご利用いただけます' },
];

// FeatureCardコンポーネントのPropsの型を定義
// idのみ除外
type FeatureCardProps = Omit<Feature, 'id'>;

// 単一の特徴カードを描画する小さなコンポーネント
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <h2>FoodShareの特徴</h2>
      <div className="features-grid">
        {features.map(({ id, ...rest }) => (  // 配列を展開し、idをkeyに、残りをpropsに渡す
          <FeatureCard key={id} {...rest} />
        ))}
      </div>
    </section>
  );
};

export default React.memo(FeaturesSection);