import React, { useRef, useState } from 'react';

type ImageUploaderProps = {
  maxImages?: number; // デフォルトは6枚
  onImagesChange: (files: (File | null)[]) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ maxImages = 6, onImagesChange }) => {
  const [images, setImages] = useState<(File | null)[]>(Array(maxImages).fill(null));
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 画像が選択されたときの処理
  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
    onImagesChange(newImages);
  };

  // 指定されたインデックスのinputをクリック
  const handleSlotClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer border"
          onClick={() => handleSlotClick(index)}
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt={`preview-${index}`}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <span className="text-gray-400 text-sm">＋画像</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={(el) => (fileInputRefs.current[index] = el)}
            onChange={(e) => handleImageChange(index, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
