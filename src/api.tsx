import axios from 'axios';

// シンプルなログアウト関数
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  // ページ遷移（ログイン画面へ）
  window.location.href = '/login';
};

const api = axios.create({
  baseURL: '/api/v1',
});

// リクエストインターセプター
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// レスポンスインターセプター
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          alert('セッションの有効期限が切れました。再度ログインしてください。');
          handleLogout();
          return Promise.reject(error);
        }

        // トークンリフレッシュAPIを叩く
        const { data } = await axios.post('/api/v1/refresh', {}, {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        });

        localStorage.setItem('token', data.access_token);

        // 元のリクエストに新しいトークンをセットして再実行
        api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        alert('セッションの有効期限が切れました。再度ログインしてください。');
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
