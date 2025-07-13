// ==================================
// 新規登録フォーム (RegisterForm)
// ==================================

// フォームの値の型を定義
export interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

// エラーオブジェクトの型 (各キーはオプショナル)
export type RegisterErrors = Partial<RegisterValues>;

// こっちは別パターン
// export type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;
// エラーオブジェクトの型を定義
// keyofで"name" | "email" | "password"のようにプロパティ名のみを抽出
// Record でそのキーに string 型の値（エラーメッセージ）を割り当て
// ?というオプショナルを設定・省略可能にしたものがPartial

export const validateRegister = (values: RegisterValues): RegisterErrors => {
  const errors: RegisterErrors = {};

  // 名前のバリデーション
  if (!values.name) {
    errors.name = 'お名前は必須です。';
  }

  // メールのバリデーション (validateLoginと同様)
  if (!values.email) {
    //errorsの中のemailプロパティを取得しerrors{}に代入
    errors.email = 'メールアドレスは必須です。';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = '有効なメールアドレスを入力してください。';
  }
  // \S+：空白文字以外の文字が1文字以上
  // @  ：「@」
  // \. ：「.」
  // 空白なしの文字列 + @ + 空白なしの文字列 + . + 空白なしの文字列をチェック

  // パスワードのバリデーション (validateLoginと同様)
  if (!values.password) {
    errors.password = 'パスワードは必須です。';
  } else if (values.password.length < 8) {
    errors.password = 'パスワードは8文字以上で入力してください。';
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = 'パスワードに大文字を含めてください。';
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = 'パスワードに小文字を含めてください。';
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = 'パスワードに数字を含めてください。';
  }
  return errors;
};


// ==================================
// ログインフォーム (LoginForm)
// ==================================

// フォームの値の型を定義
export interface LoginValues {
  email: string;
  password: string;
}

// エラーオブジェクトの型を定義（各キーはオプショナル）
export type LoginErrors = Partial<LoginValues>;

export const validateLogin = (values: LoginValues): LoginErrors => {
  const errors: LoginErrors = {};

  // メールのバリデーション
  if (!values.email) {
    errors.email = 'メールアドレスは必須です。';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = '有効なメールアドレスを入力してください。';
  }

  // パスワードのバリデーション
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