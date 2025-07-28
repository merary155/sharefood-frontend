export type ActiveTab = 'login' | 'register' | 'forgot';

export interface ModalState {
  isOpen: boolean;
  tab: ActiveTab;
}

export interface User {
  id: number;
  username: string;
}

// フォームの値の型を定義
export interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// 商品データ型
export interface FoodItem {
  id: number;
  name: string;
  img_url: string;
  location: string;
  expiration_date?: string; // ?を付けることによって必須入力ではなくなる
}

export interface FoodFormData {
  name: string;
  description: string;
  quantity: number;
  unit: string;
  expiration_date: string;
  location: string;
  latitude?: number;
  longitude?: number;
}