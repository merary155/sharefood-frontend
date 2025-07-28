import { FoodFormData } from "../interface/types";

// ==================================
// 有効期限(expiration_data)
// ==================================

export function validateExpirationData(dateStr: string): string {
  if (!dateStr) {
    return "有効期限を入力してください。";
  }

  const today = new Date();
  const inputDate = new Date(dateStr);

  // isNaN(date.getTime()) は、日付が無効な場合にtrueを返す
  if (isNaN(inputDate.getTime())) {
    return "有効な日付形式で入力してください。";
  }

  if (inputDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
    return "有効期限は今日以降の日付を入力してください。";
  }

  return "";
}

// ==================================
// 入力フォームバリデーションチェック
// ==================================

export function validateFormData(formData:FoodFormData, images: File[]):string | null {
  // 商品名
  if (!formData.name.trim()) {
    return "商品名を入力してください";
  }

  // 商品説明
  if (!formData.description.trim()) {
    return "商品説明を入力してください";
  }

  // 数量
  if (formData.quantity <= 0) {
    return "数量は1以上で入力してください";
  }

  // 有効期限
  if (!formData.expiration_date) {
    return "有効期限を入力してください";
  }
  const expirationError = validateExpirationData(formData.expiration_date);
  if (expirationError) {
    return expirationError;
  }

  // 受け渡し場所
  if (!formData.location.trim()) {
    return "受け渡し場所を入力または地図で選択してください";
  }

  // 画像
  if (images.length === 0) {
    return "画像を1枚以上登録してください";
  }

  return null; // エラーなし
}