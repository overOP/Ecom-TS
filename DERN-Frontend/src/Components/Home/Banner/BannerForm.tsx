import React, { useState, useRef, useCallback, useEffect } from "react";

interface BannerFormProps {
  onCreate: (data: { title: string; subtitle: string; url: string; logoUrl: string }) => void;
  onClose: () => void;
  initialData?: { title: string; subtitle: string; url: string; logoUrl: string };
}

const BannerForm: React.FC<BannerFormProps> = ({ onCreate, onClose, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.logoUrl || null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // If initialData changes (like switching banners to edit), update states
    setTitle(initialData?.title || "");
    setSubtitle(initialData?.subtitle || "");
    setUrl(initialData?.url || "");
    setLogoPreview(initialData?.logoUrl || null);
    setLogoFile(null);
  }, [initialData]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) {
      alert("Please fill title and url.");
      return;
    }
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCreate({ title, subtitle, url, logoUrl: reader.result as string });
        onClose();
      };
      reader.readAsDataURL(logoFile);
    } else {
      // If no new logo file selected, use existing preview or empty string
      onCreate({ title, subtitle, url, logoUrl: logoPreview || "" });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Banner" : "Create New Banner"}</h2>
        <label className="block mb-2">
          Title <span className="text-red-500">*</span>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="block mb-2">
          Subtitle
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={subtitle}
            onChange={e => setSubtitle(e.target.value)}
          />
        </label>
        <label className="block mb-2">
          URL <span className="text-red-500">*</span>
          <input
            type="url"
            className="w-full mt-1 p-2 border rounded"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
        </label>

        {/* Dropzone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-400 rounded p-4 text-center cursor-pointer mb-4"
        >
          {logoPreview ? (
            <img src={logoPreview} alt="Preview" className="mx-auto h-24 object-contain" />
          ) : (
            <p className="text-gray-500">Drag & drop logo here, or click to select</p>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;
