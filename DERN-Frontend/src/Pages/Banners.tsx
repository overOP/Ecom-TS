import React, { useState, useEffect } from "react";
import BannerForm from "@/Components/Home/Banner/BannerForm";
import BannerItem from "@/Components/Home/Banner/BannerItem";
import { SyncLoader } from "react-spinners";

interface BannerData {
  title: string;
  subtitle: string;
  url: string;
  logoUrl: string;
}

const Banners: React.FC = () => {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching banners from a data source
  useEffect(() => {
    const timer = setTimeout(() => {
      // Optionally pre-load from localStorage or API here
      setLoading(false);
    }, 500); // simulate loading delay

    return () => clearTimeout(timer);
  }, []);

  const handleCreate = (data: BannerData) => {
    if (editingIndex !== null) {
      setBanners((prev) => {
        const newBanners = [...prev];
        newBanners[editingIndex] = data;
        return newBanners;
      });
      setEditingIndex(null);
    } else {
      setBanners((prev) => [data, ...prev]);
    }
    setIsFormOpen(false);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      setBanners((prev) => prev.filter((_, i) => i !== index));
      if (editingIndex === index) {
        setIsFormOpen(false);
        setEditingIndex(null);
      }
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingIndex(null);
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
      <h1 className="text-3xl font-bold mb-6">Banner Management</h1>

      <button
        onClick={() => {
          setIsFormOpen(true);
          setEditingIndex(null);
        }}
        className="mb-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create New Banner
      </button>

      {isFormOpen && (
        <BannerForm
          onCreate={handleCreate}
          onClose={handleCloseForm}
          initialData={editingIndex !== null ? banners[editingIndex] : undefined}
        />
      )}

      <div>
        {banners.length === 0 ? (
          <p className="text-gray-500">No banners created yet.</p>
        ) : (
          banners.map((banner, idx) => (
            <BannerItem
              key={idx}
              title={banner.title}
              subtitle={banner.subtitle}
              url={banner.url}
              logoUrl={banner.logoUrl}
              onEdit={() => handleEdit(idx)}
              onDelete={() => handleDelete(idx)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Banners;
