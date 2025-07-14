import { useState } from "react";
import { Dropzone, FileItem } from "@dropzone-ui/react";

type Product = {
  title: string;
  image: string;
  brand: string;
  price: number;
};

type Props = {
  onClose: () => void;
  onCreate: (product: Product) => void;
};

type DropzoneFile = {
  id: string;
  file: File;
  // other props Dropzone may add, but we only need file for reading
};

export const ProductModal= ({ onClose, onCreate }: Props) => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState<DropzoneFile[]>([]);

  const handleSubmit = () => {
    if (files.length === 0) {
      alert("Please upload an image.");
      return;
    }
    if (!title || !brand || !price) {
      alert("Please fill all fields.");
      return;
    }

    const fileBlob = files[0].file;

    const reader = new FileReader();
    reader.onloadend = () => {
      onCreate({
        title,
        brand,
        price: parseFloat(price),
        image: reader.result as string,
      });
      onClose();
    };

    reader.readAsDataURL(fileBlob);
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Create New Product</h2>
        <input
          className="w-full border p-2 mb-2"
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-2"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-2"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Dropzone value={files} onChange={setFiles} maxFiles={1}>
          {files.map((file, i) => (
            <FileItem {...file} key={i} preview />
          ))}
        </Dropzone>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button onClick={onClose} className="text-red-500 hover:underline">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
