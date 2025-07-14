import React, { useState, useRef, useEffect } from "react";

interface AdvertisementFormProps {
  onSubmit: (data: {
    title: string;
    subtitle: string;
    paragraph: string;
    date: string;
    imageUrl: string;
  }) => void;
  onClose: () => void;
  initialData?: {
    title: string;
    subtitle: string;
    paragraph: string;
    date: string;
    imageUrl: string;
  };
}

const AdvertisementForm: React.FC<AdvertisementFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [paragraph, setParagraph] = useState(initialData?.paragraph || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(initialData?.title || "");
    setSubtitle(initialData?.subtitle || "");
    setParagraph(initialData?.paragraph || "");
    setDate(initialData?.date || "");
    setImagePreview(initialData?.imageUrl || null);
    setImageFile(null);
  }, [initialData]);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle || !paragraph || !date || (!imageFile && !imagePreview)) {
      alert("Please fill all fields");
      return;
    }

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSubmit({
          title,
          subtitle,
          paragraph,
          date,
          imageUrl: reader.result as string,
        });
        onClose();
      };
      reader.readAsDataURL(imageFile);
    } else {
      onSubmit({
        title,
        subtitle,
        paragraph,
        date,
        imageUrl: imagePreview!,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold">
          {initialData ? "Edit Advertisement" : "New Advertisement"}
        </h2>

        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Advertisement Title"
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          type="text"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
          placeholder="Advertisement Subtitle"
          className="w-full border rounded px-3 py-2"
          required
        />

        <textarea
          value={paragraph}
          onChange={e => setParagraph(e.target.value)}
          placeholder="Paragraph"
          rows={4}
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />

        <div
          className="border-2 border-dashed border-gray-400 rounded p-4 text-center cursor-pointer"
          onClick={() => fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          {imagePreview ? (
            <img src={imagePreview} className="h-24 mx-auto object-contain" />
          ) : (
            <p>Click or drop an image here</p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {initialData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvertisementForm;
