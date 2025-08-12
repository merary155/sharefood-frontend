import React, { useState } from 'react';
import { FoodItem } from '../interface/types';

type Props = {
  item: FoodItem;
  onToggle: (id: number, newAvailability: boolean) => void;
};

const ToggleAvailabilityButton: React.FC<Props> = ({ item, onToggle }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('ログインが必要です');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/v1/items/${item.id}/toggle-availability`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        onToggle(item.id, data.is_available);
      } else {
        alert(data.message || 'エラーが発生しました');
      }
    } catch {
      alert('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`mt-4 py-2 px-4 rounded text-white ${
        item.is_available ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? '処理中...' : (item.is_available ? '非公開にする' : '公開にする')}
    </button>
  );
};

export default ToggleAvailabilityButton;