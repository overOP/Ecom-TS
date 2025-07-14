import React, { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { PlusCircle } from 'lucide-react';
import CategoryForm from '@/Components/Home/Category/CategoryForm';
import CategoryCard from '@/Components/Home/Category/CategoryCard';
import HTTP from '@/config/Axios';

interface Category {
  id?: number;
  name: string;
  image?: string;
  createdAt?: string;
}

const Categorys: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({ name: '' });
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await HTTP.get('/category');
      setCategories(res.data.data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateOrUpdateCategory = async () => {
    if (!newCategory.name.trim()) return;

    try {
      if (editIndex !== null) {
        // You can add PUT here later if you want to implement edit
      } else {
        await HTTP.post('/category', newCategory);
        fetchCategories(); // Refresh after add
      }
      setNewCategory({ name: '' });
      setEditIndex(null);
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to save category', err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="flex items-center gap-2"
              onClick={() => {
                setNewCategory({ name: '' });
                setEditIndex(null);
              }}
            >
              <PlusCircle className="w-5 h-5" /> Create Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CategoryForm
              category={newCategory}
              onChange={setNewCategory}
              onSubmit={handleCreateOrUpdateCategory}
              isEditing={editIndex !== null}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category, idx) => (
          <CategoryCard
            key={category.id || idx}
            category={category}
            onEdit={() => {
              setEditIndex(idx);
              setNewCategory(category);
              setIsOpen(true);
            }}
            onDelete={() => {}} // You can add delete here later
          />
        ))}
      </div>
    </div>
  );
};

export default Categorys;
