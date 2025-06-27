export default function Main() {
  return (
    <main style={{
      minHeight: '120vh',  // 画面より長めにしてスクロールできるように
      padding: '40px',
      backgroundColor: '#fff'
    }}>
      <h2>メインコンテンツ</h2>
      <p>ここにたくさんコンテンツを入れましょう。</p>
      <p>スクロールしてヘッダーが縮む様子を見てみてね！</p>
      {/* コンテンツ増やしたいならここに追加 */}
    </main>
  );
}
