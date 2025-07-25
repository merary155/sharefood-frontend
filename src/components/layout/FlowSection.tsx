import React from 'react';

// ステップのデータ型を定義
interface Step {
  number: number;
  title: string;
  description: string;
}

// 各ステップのデータを配列として定義
const giverSteps: Step[] = [
  { number: 1, title: '会員登録', description: '簡単な登録で始めましょう' },
  { number: 2, title: '商品の在庫を掲載', description: '余った食品を写真と共に投稿' },
  { number: 3, title: 'マッチング', description: '受け取り希望者とのマッチング' },
  { number: 4, title: '譲渡', description: '約束の場所で安全にお渡し' },
];

const receiverSteps: Step[] = [
  { number: 1, title: '会員登録', description: '簡単な登録で始めましょう' },
  { number: 2, title: '商品を検索', description: '欲しい食品を検索して見つける' },
  { number: 3, title: 'マッチング', description: '譲渡者とのマッチング成立' },
  { number: 4, title: '受け取りに行く', description: '約束の場所で食品を受け取り' },
];

// 単一のステップを描画する小さなコンポーネント
// FlowStepコンポーネントのPropsに型を適用
const FlowStep: React.FC<Step> = ({ number, title, description }) => (
  <div className="step">
    <div className="step-number">{number}</div>
    <div className="step-content">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

const FlowSection: React.FC = () => {
  return (
    <section className="flow-section">
      <h2>ご利用の流れ</h2>
      <div className="flow-container">
        <div className="flow-card giver-flow">
          <h3>🎁 譲渡する方</h3>
          <div className="flow-steps">
            {giverSteps.map(step => (
              <FlowStep key={`giver-${step.number}`} {...step} />
            ))}
          </div>
        </div>

        <div className="flow-card receiver-flow">
          <h3>🤝 受け取る方</h3>
          <div className="flow-steps">
            {receiverSteps.map(step => (
              <FlowStep key={`receiver-${step.number}`} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(FlowSection);