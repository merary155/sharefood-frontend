type UserPanelProps = {
  onLogout: () => void;
  user: { id: number; username: string } | null;
  onNavigate: (to: string) => void;
}

const UserPanel: React.FC<UserPanelProps> = ({onLogout, user, onNavigate}) => {
  return(
    <>
      {/* ★ ユーザーがログインしていたら表示するブロック */}
      {user && (
        <div className="mt-10 text-center my-6">
          <p className="text-3xl font-extrabold text-gray-800 tracking-wide leading-relaxed drop-shadow-sm">
            {user.username} 様、ようこそ！
          </p>
          <div className="mt-20 flex flex-col items-center gap-20">
            <div className="flex gap-10">
              <button
                onClick={() => onNavigate('/app/register-food')}
                className="bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300"
              >
                商品登録はこちら
              </button>
              <button
                onClick={() => onNavigate('/app/search')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300"
              >
                商品検索はこちら
              </button>
            </div>

            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300"
            >
              ログアウトはこちら
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPanel;