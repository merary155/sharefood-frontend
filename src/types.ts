export type ActiveTab = 'login' | 'register' | 'forgot';

export interface ModalState {
  isOpen: boolean;
  tab: ActiveTab;
}

export interface User{
  id: number;
  username: string;
}