import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { PlusCircle } from 'lucide-react';
import SubcategoryForm from '@/Components/Home/Subcategory/SubcategoryForm';
import SubcategoryCard from '@/Components/Home/Subcategory/SubcategoryCard';
import { SyncLoader } from 'react-spinners';

interface Subcategory {
  name: string;
  image?: string; // base64 string
}

const STORAGE_KEY = 'subcategories';

const Subcategories: React.FC = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [newSubcategory, setNewSubcategory] = useState<Subcategory>({ name: '' });
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSubcategories(JSON.parse(stored));
      }
      setLoading(false);
    }, 500); // small delay to show loader

    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subcategories));
  }, [subcategories]);

  const handleCreateOrUpdate = () => {
    if (!newSubcategory.name.trim()) return;
    if (editIndex !== null) {
      const updated = [...subcategories];
      updated[editIndex] = newSubcategory;
      setSubcategories(updated);
    } else {
      setSubcategories([...subcategories, newSubcategory]);
    }
    setNewSubcategory({ name: '' });
    setEditIndex(null);
    setIsOpen(false);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setNewSubcategory(subcategories[index]);
    setIsOpen(true);
  };

  const handleDelete = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SyncLoader color="#3b82f6" size={15} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subcategories</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="flex items-center gap-2"
              onClick={() => {
                setNewSubcategory({ name: '' });
                setEditIndex(null);
              }}
            >
              <PlusCircle className="w-5 h-5" /> Create Subcategory
            </Button>
          </DialogTrigger>
          <DialogContent>
            <SubcategoryForm
              subcategory={newSubcategory}
              onChange={setNewSubcategory}
              onSubmit={handleCreateOrUpdate}
              isEditing={editIndex !== null}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subcategories.map((subcategory, idx) => (
          <SubcategoryCard
            key={idx}
            subcategory={subcategory}
            onEdit={() => handleEdit(idx)}
            onDelete={() => handleDelete(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Subcategories;
