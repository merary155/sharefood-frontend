import React, { useState } from 'react';
import ImageModal from './ImageModal';
import ImageGrid from './ImageGrid';

type ImageUploaderProps = {
  maxImages?: number; // デフォルトは6枚
  onImagesChange: (files: (File | null)[]) => void; // "File(JS標準搭載)"か"null"のどちらかの型でチェック
};

// ImageUploaderコンポーネント：画像を最大 maxImages 枚までアップロードできる
const ImageUploader: React.FC<ImageUploaderProps> = ({ maxImages = 6, onImagesChange }) => {
  const [images, setImages] = useState<(File | null)[]>(Array(maxImages).fill(null));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 画像が変わったら親に通知
  const updateImages = (newImages: (File | null)[]) => {
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <>
      <ImageGrid
        images={images}
        maxImages={maxImages}
        onImagesChange={updateImages}
        onSelectImage={setSelectedImage}
      />
      {selectedImage && <ImageModal imgUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
    </>
  );
};

export default ImageUploader;
