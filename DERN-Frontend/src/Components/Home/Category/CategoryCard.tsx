import React from 'react';
import { Button } from '@/Components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface Category {
  name: string;
  image?: string; // base64 string
}

interface CategoryCardProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl p-4 flex items-center justify-between shadow-sm bg-white">
      <div className="flex items-center gap-4">
        {category.image && (
          <img src={category.image} alt="Preview" className="w-auto h-16 object-cover rounded-md" />
        )}
        <span className="font-medium text-lg">{category.name}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={onEdit}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={onDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
