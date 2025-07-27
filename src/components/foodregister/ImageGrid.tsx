import React, { useRef, useEffect, useState } from 'react';

type ImageGridProps = {
  images: (File | null)[];
  maxImages: number;
  onImagesChange: (files: (File | null)[]) => void;
  onSelectImage: (url: string) => void;
};

const ImageGrid: React.FC<ImageGridProps> = ({ images, maxImages, onImagesChange, onSelectImage }) => {
  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>(Array(maxImages).fill(null));
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const newUrls = images.map(img => img ? URL.createObjectURL(img) : null);
    setPreviewUrls(newUrls);

    return () => {
      newUrls.forEach(url => url && URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const newImages = [...images];
    newImages[index] = file;
    onImagesChange(newImages);
  };

  const handleSlotClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    onImagesChange(newImages);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mx-auto">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer border"
          onClick={() => {
            if (image) {
              onSelectImage(previewUrls[index]!);
            } else {
              handleSlotClick(index);
            }
          }}
        >
          {image ? (
            <>
              <img
                src={previewUrls[index] || ''}
                alt={`preview-${index}`}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation(); // 親divのクリックを防ぐ
                  handleDelete(index);
                }}
              >
                ×
              </button>
            </>
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

export default ImageGrid;