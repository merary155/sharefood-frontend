export type ActiveTab = 'login' | 'register' | 'forgot';

export type ModalType = 'editModal' | null;

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
  image_url: string;
  location: string;
  expiration_date?: string; // ?を付けることによって必須入力ではなくなる
  is_available: boolean;    // 商品の掲載・非掲載の切り替え
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