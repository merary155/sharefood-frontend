import { FoodFormData } from "../interface/types";

// フォーム入力状態の管理
const initialFormData: FoodFormData = {
  name: '',
  description : '',
  quantity: 1,
  unit: '個',
  expiration_date: '',
  location: '',
  latitude: 0,
  longitude: 0,
};

export default initialFormData;