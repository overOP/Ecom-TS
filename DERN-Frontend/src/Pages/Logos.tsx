import React, { useState, useEffect } from "react";
import LogoItem from "@/Components/Home/Logo/LogoItem";
import LogoForm from "@/Components/Home/Logo/LogoForm";
import { SyncLoader } from "react-spinners";

interface LogoData {
  label: string;
  category: string;
  logoUrl: string;
}

const Logos: React.FC = () => {
  const [logos, setLogos] = useState<LogoData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  const handleAddOrEdit = (data: LogoData) => {
    if (editingIndex !== null) {
      const updated = [...logos];
      updated[editingIndex] = data;
      setLogos(updated);
      setEditingIndex(null);
    } else {
      setLogos((prev) => [data, ...prev]);
    }
    setIsFormOpen(false);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index: number) => {
    if (confirm("Delete this logo?")) {
      setLogos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SyncLoader color="#3b82f6" size={15} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Logo Manager</h1>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingIndex(null);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Logo
        </button>
      </div>

      {isFormOpen && (
        <LogoForm
          onSubmit={handleAddOrEdit}
          onClose={() => {
            setIsFormOpen(false);
            setEditingIndex(null);
          }}
          initialData={editingIndex !== null ? logos[editingIndex] : undefined}
        />
      )}

      <div>
        {logos.length === 0 ? (
          <p className="text-gray-500">No logos added yet.</p>
        ) : (
          logos.map((logo, index) => (
            <LogoItem
              key={index}
              label={logo.label}
              category={logo.category}
              logoUrl={logo.logoUrl}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Logos;
