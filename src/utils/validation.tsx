// フォームの値の型を定義
export interface LoginValues {
  email: string;
  password: string;
}

// エラーオブジェクトの型を定義（各キーはオプショナル）
export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

export const validateLogin = (values: LoginValues): LoginErrors => {
  const errors: LoginErrors = {};

  if (!values.email) {
    errors.email = 'メールアドレスは必須です。';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = '有効なメールアドレスを入力してください。';
  }

  if (!values.password) {
    errors.password = 'パスワードは必須です。';
  } else if (values.password.length < 8) {
    errors.password = 'パスワードは8文字以上で入力してください。';
  // !で条件を反転させてから.testでバリデーションチェック
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = 'パスワードに大文字を含めてください。';
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = 'パスワードに小文字を含めてください。';
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = 'パスワードに数字を含めてください。';
  }

  return errors;
};
