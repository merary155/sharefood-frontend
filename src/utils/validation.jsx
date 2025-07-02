//ログイン時のvalidation_message
export function validateLogin(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "メールアドレスを入力してください";
  }

  if (!values.password) {
    errors.password = "パスワードが違います";
  }

  return errors;
}

//登録時のvalidation_message
export function validateRegister(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "メールアドレスを入力してください";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "正しいメールアドレス形式で入力してください";
  }

  if (!values.password) {
    errors.password = "パスワードを入力してください";
  } else if (values.password.length < 8) {
    errors.password = "パスワードは8文字以上にしてください";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "大文字を含めてください";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "小文字を含めてください";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "数字を含めてください";
  }

  return errors;
}
