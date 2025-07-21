export type ActiveTab = 'login' | 'register' | 'forgot';

export interface ModalState {
  isOpen: boolean;
  tab: ActiveTab;
}