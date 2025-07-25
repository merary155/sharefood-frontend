import React, { useState, useEffect} from 'react';
import { ActionFunction } from 'react-router-dom';
import { ActiveTab } from '../interface/types';
import { FoodItem } from '../interface/types';

interface EditFoodModalProps {
  isOpen: boolean;
  foodItem: FoodItem | null; // 編集対象のアイテムが存在するかどうか
  onClose: () => void;
  onSave: (updataItem: FoodItem) => void; // 更新されたFoodItemを引数に受け取り、保存処理を行う関数
}

// ここに商品編集機能を追加する

// const EditFoodModal:React.FC<EditFoodModalProps> = ({ isOpen, foodItem, onClose, onSave }) => {
//   const [name,setName] = useState('');
//   const [imgUrl,setImgUrl] = useState('');
//   const [expirationDate, setExpirationDate] = useState('');
//   const [location, setLocation] = useState('');
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (foodItem){
//       setName(foodItem.name);
//       setImgUrl(foodItem.img_url);
//       setExpirationDate(foodItem.expiration_date ? foodItem.expiration_date)
//     }
//    }
//   )
// }