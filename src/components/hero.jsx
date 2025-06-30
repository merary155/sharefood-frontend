import '../css/hero.css';
import React, { useState, useEffect } from 'react';

const images = [
  "https://as2.ftcdn.net/v2/jpg/01/13/40/63/1000_F_113406376_wYAgGQTd2BYkN5ox3WJklrve0S0M7Cbt.jpg",
  "https://as1.ftcdn.net/v2/jpg/03/82/80/32/1000_F_382803216_VmtYCam39suzv6K9a009XYlYJqDyo9T9.jpg",
  "https://t4.ftcdn.net/jpg/03/20/39/81/240_F_320398182_1X1ebszxgKyeS6j291ywWYIw1dfRLETC.jpg"
];

export default function Hero() {

  const [currentIndex,setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(()=>{
    const intervalID = setInterval(()=>{
      // まずフェードアウト開始
      setFade(false);

      // 0.5秒後（フェードアウトの時間）に画像を切り替えてフェードイン
        setTimeout(() => {
          setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
          setFade(true);
        }, 500);
      }, 3000); // 3秒毎に切り替え

    // クリーンアップ
    return () => clearInterval(intervalID);
     }, []);
  
  return (
    <section className="hero">
      <div className="image-wrapper">
        <img 
          className='img'
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={{ opacity: fade ? 1 : 0 }}
        />
        <div className="overlay-text">
          もったいないを、ありがとうに。
        </div>
      </div>
    </section>
  );
}
