import React, { useState, useEffect } from "react";
import AdvertisementForm from "@/Components/Home/Advertisement/AdvertisementForm";
import AdvertisementItem from "@/Components/Home/Advertisement/AdvertisementItem";
import { SyncLoader } from "react-spinners";

interface Advertisement {
  title: string;
  subtitle: string;
  paragraph: string;
  date: string;
  imageUrl: string;
}

const Advertisements: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Delay can be adjusted
    return () => clearTimeout(timer);
  }, []);

  const handleAddOrUpdate = (data: Advertisement) => {
    if (editingIndex !== null) {
      const updated = [...ads];
      updated[editingIndex] = data;
      setAds(updated);
      setEditingIndex(null);
    } else {
      setAds((prev) => [data, ...prev]);
    }
    setIsFormOpen(false);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      setAds((prev) => prev.filter((_, i) => i !== index));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SyncLoader color="#3b82f6" size={15} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Advertisements</h1>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingIndex(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Ad
        </button>
      </div>

      {isFormOpen && (
        <AdvertisementForm
          onSubmit={handleAddOrUpdate}
          onClose={() => {
            setIsFormOpen(false);
            setEditingIndex(null);
          }}
          initialData={editingIndex !== null ? ads[editingIndex] : undefined}
        />
      )}

      <div>
        {ads.length === 0 ? (
          <p className="text-gray-500">No advertisements yet.</p>
        ) : (
          ads.map((ad, index) => (
            <AdvertisementItem
              key={index}
              {...ad}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Advertisements;
