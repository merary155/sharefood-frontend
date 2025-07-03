export default function ForgotPassword() {
  return (
    <form>
      <h2>パスワードを忘れた方</h2>
      <input type="email" placeholder="登録メールアドレス" required />
      <button type="submit">送信</button>
    </form>
  );
}