import React, { useState, useEffect} from 'react';
import { ActionFunction } from 'react-router-dom';
import { ActiveTab } from '../types';

// 商品データ型
interface FoodItem {
  id: number;
  name: string;
  img_url: string;
  location: string;
  expiration_date?: string; // ?を付けることによって必須入力ではなくなる
}

interface EditFoodModalProps {
  isOpen: boolean;
  foodItem: FoodItem | null; // 編集対象のアイテムが存在するかどうか
  onClose: () => void;
  onSave: (updataItem: FoodItem) => void; // 更新されたFoodItemを引数に受け取り、保存処理を行う関数
}

const EditFoodModal:React.FC<EditFoodModalProps> = ({ isOpen, foodItem, onClose, onSave }) => {
  const [name,setName] = useState('');
  const [imgUrl,setImgUrl] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (foodItem){
      setName(foodItem.name);
      setImgUrl(foodItem.img_url);
      setExpirationDate(foodItem.expiration_date ? foodItem.expiration_date)
    }
  }
    
  )
}