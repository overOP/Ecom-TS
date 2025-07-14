import React from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import DropZone from './DropZone';

interface Subcategory {
  name: string;
  image?: string; // base64 string
}

interface SubcategoryFormProps {
  subcategory: Subcategory;
  onChange: (subcategory: Subcategory) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({
  subcategory,
  onChange,
  onSubmit,
  isEditing,
}) => {
  const handleDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange({ ...subcategory, image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 backdrop-blur-sm">
      <h2 className="text-xl font-semibold">{isEditing ? 'Edit Subcategory' : 'New Subcategory'}</h2>
      <Input
        placeholder="Subcategory name"
        value={subcategory.name}
        onChange={(e) => onChange({ ...subcategory, name: e.target.value })}
      />
      <DropZone onDrop={handleDrop} />
      {subcategory.image && (
        <img src={subcategory.image} alt="Preview" className="w-32 h-32 object-cover rounded-md mx-auto" />
      )}
      <Button onClick={onSubmit} className="w-full">
        {isEditing ? 'Update' : 'Submit'}
      </Button>
    </div>
  );
};

export default SubcategoryForm;
