import React, { useRef, useState, useEffect } from "react";

interface LogoFormProps {
  onSubmit: (data: { label: string; category: string; logoUrl: string }) => void;
  onClose: () => void;
  initialData?: { label: string; category: string; logoUrl: string };
}

const LogoForm: React.FC<LogoFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [label, setLabel] = useState(initialData?.label || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.logoUrl || null);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLabel(initialData?.label || "");
    setCategory(initialData?.category || "");
    setLogoPreview(initialData?.logoUrl || null);
    setLogoFile(null);
  }, [initialData]);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
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
    if (!label || !category || (!logoFile && !logoPreview)) {
      alert("Please fill all required fields.");
      return;
    }

    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSubmit({ label, category, logoUrl: reader.result as string });
        onClose();
      };
      reader.readAsDataURL(logoFile);
    } else {
      onSubmit({ label, category, logoUrl: logoPreview! });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50  backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">{initialData ? "Edit Logo" : "Add New Logo"}</h2>

        <input
          type="text"
          placeholder="Logo Label (e.g., Nike)"
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        <input
          type="text"
          placeholder="Category (e.g., Sponsor, Retail)"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        <div
          onClick={() => fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="border-dashed border-2 border-gray-400 p-4 rounded text-center cursor-pointer"
        >
          {logoPreview ? (
            <img src={logoPreview} alt="Preview" className="mx-auto h-24 object-contain" />
          ) : (
            <p>Click or drag & drop logo image</p>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileRef}
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>

        <div className="flex justify-end space-x-2">
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
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogoForm;
