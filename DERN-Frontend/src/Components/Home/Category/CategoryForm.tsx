import React from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import DropZone from './DropZone';

interface Category {
  name: string;
  image?: string; // base64 string now
}

interface CategoryFormProps {
  category: Category;
  onChange: (category: Category) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onChange, onSubmit, isEditing }) => {
  // Convert dropped file to base64 and send up
  const handleDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange({ ...category, image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 backdrop-blur-sm">
      <h2 className="text-xl font-semibold">{isEditing ? 'Edit Category' : 'New Category'}</h2>
      <Input
        placeholder="Category name"
        value={category.name}
        onChange={(e) => onChange({ ...category, name: e.target.value })}
      />
      <DropZone onDrop={handleDrop} />
      {category.image && (
        <img src={category.image} alt="Preview" className="w-32 h-32 object-cover rounded-md mx-auto" />
      )}
      <Button onClick={onSubmit} className="w-full">
        {isEditing ? 'Update' : 'Submit'}
      </Button>
    </div>
  );
};

export default CategoryForm;
