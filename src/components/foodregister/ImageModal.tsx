type ImageModalProps = {
  imgUrl: string;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ imgUrl, onClose }) => {
  return(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img
        src={imgUrl}
        alt="拡大画像"
        className="max-w-[80%] max-h-[80%] rounded-lg"        
      />
    </div>
  );
};

export default ImageModal;