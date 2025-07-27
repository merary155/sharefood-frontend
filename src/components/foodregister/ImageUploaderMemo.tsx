/*

type ImageUploaderProps = {
  maxImages?: number; // デフォルトは6枚
  onImagesChange: (files: (File | null)[]) => void; // "File(JS標準搭載)"か"null"のどちらかの型でチェック
};

// ImageUploaderコンポーネント：画像を最大 maxImages 枚までアップロードできる
const ImageUploader: React.FC<ImageUploaderProps> = ({ maxImages = 6, onImagesChange }) => {
  
  // ------------------------------
  // .fill(null) で全要素を null に変える → [null, null, null, null, null, null]　
  // つまり、初期値はすべての画像スロットが空（null）の状態で始まる配列
  // ------------------------------
  const [images, setImages] = useState<(File | null)[]>(Array(maxImages).fill(null));
  
  // ------------------------------
  // 各画像アップロード用の <input type="file"> にアクセスするための参照（ref）を保持
  // refを使うと、React経由でDOM（input要素）を直接操作できる
  // ここではクリックをトリガーする目的で使う
  // ------------------------------
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // ------------------------------
  // ファイルが選択されたときに呼ばれる関数（onChangeハンドラ）
  // index：どの画像スロットが操作されたか
  // e：ファイル選択イベント（input要素で発生）
  // ------------------------------
  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    // 選ばれたファイルを取得（1枚目だけ）、選択されていなければ nullを入れる
    const file = e.target.files?.[0] || null;
    // 現在の画像リストをコピーして、指定された位置に新しいファイルを上書き
    // コピーしないと元の配列（images）が直接変わってしまい、Reactが変更を検知できない可能性がある
    const newImages = [...images];
    newImages[index] = file;

    // 状態を更新 → 画面も自動的に再描画される
    setImages(newImages);
    // 親コンポーネントに画像の変更を通知（外部に渡すためのコールバック）
    onImagesChange(newImages);
  };


  // 指定されたインデックスのinputをクリック
  const handleSlotClick = (index: number) => {
    // useRefで保持しているinput要素を取得し、
    // 要素が存在すれば（?.はnullチェック）.click()でクリックしたときと同じ行動を起こす
    fileInputRefs.current[index]?.click(); 
  };

  */