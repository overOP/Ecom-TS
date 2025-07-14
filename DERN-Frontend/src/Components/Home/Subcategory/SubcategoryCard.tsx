import React from 'react';
import { Button } from '@/Components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface Subcategory {
  name: string;
  image?: string; // base64 string
}

interface SubcategoryCardProps {
  subcategory: Subcategory;
  onEdit: () => void;
  onDelete: () => void;
}

const SubcategoryCard: React.FC<SubcategoryCardProps> = ({ subcategory, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl p-4 flex items-center justify-between shadow-sm bg-white">
      <div className="flex items-center gap-4">
        {subcategory.image && (
          <img src={subcategory.image} alt="Preview" className="w-16 h-16 object-cover rounded-md" />
        )}
        <span className="font-medium text-lg">{subcategory.name}</span>
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

export default SubcategoryCard;
