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

const EditFoodModal:React.FC<EditFoodModalProps> = ({isOpen, foodItem, onClose, onSave}) => {
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   if (foodItem){
     setName(foodItem.name);
     setImgUrl(foodItem.img_url);
     setExpirationDate(foodItem.expiration_date || '');
     setLocation(foodItem.location || '');
   } 
  }, [foodItem]);

  return (
    <div>
      <h2>商品を編集</h2>
      {/* 商品名編集フォーム */}
      <input
        type="text"
        placeholder="商品名（必須）"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* 説明編集フォーム */}
      <input
        type="text"
        placeholder="商品や受け渡し場所の説明（必須）"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* 数量編集フォーム */}
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        min="1"
        step="1"
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* 単位編集フォーム */}
      <input
        type="text"
        placeholder="単位（例：個、kg、袋）"
        name="unit"
        value={formData.unit}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* 有効期限編集フォーム */}
      <input
        type="date"
        name="expiration_date"
        value={formData.expiration_date}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />
      {expirationError && (
        <p className="text-red-500 text-sm mb-4">{expirationError}</p>
      )}

      {/* 受け渡し場所を編集で選択 */}
      <input
        type="text"
        placeholder='例：〒100-0005 東京都千代田区丸の内'
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full disabled:bg-gray-200"
        disabled={isGeocoding}
      />
      {isGeocoding && <p className="text-sm text-blue-500 -mt-2 mb-4">住所を取得中...</p>}

      {/* 受け渡し場所を地図で選択 */}
      <div>
        <label className="block mb-2 font-bold text-gray-700">受け渡し場所は地図からもご選択いただけます</label>
        <MapContainer
          center={[35.681236, 139.767125]} // 東京駅あたり
          zoom={10}
          style={{ height: '300px', width: '100%' }}
        >
        {/* attributionは著作権 */}
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker
          onLocationChange={handleLocationChange}
          initialPosition={formData.latitude && formData.longitude ? [formData.latitude, formData.longitude] : undefined}
        />
        </MapContainer>
        <p className="mt-2 text-sm text-gray-600">
          選択中の位置: {formData.location || '未選択'}
        </p>
      </div>

      {/* 登録ボタン */}
      <button
        onClick={onSubmit}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
      >
        商品を登録する
      </button>

      {/* 商品一覧ページに戻る */}
      <button 
        onClick={()=>navigate('/app/dashboard')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        商品一覧ページに戻る
      </button>
    </div>
  );
};