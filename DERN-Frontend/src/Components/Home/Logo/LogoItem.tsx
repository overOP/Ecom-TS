import React from "react";

interface LogoItemProps {
  label: string;
  category: string;
  logoUrl: string;
  onEdit: () => void;
  onDelete: () => void;
}

const LogoItem: React.FC<LogoItemProps> = ({ label, category, logoUrl, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded shadow-sm mb-4 bg-white">
      <div className="flex items-center">
        <img src={logoUrl} alt={label} className="w-16 h-16 object-contain mr-4 rounded-full" />
        <div>
          <h3 className="font-semibold text-lg">{label}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
      </div>
      <div className="space-x-2">
        <button onClick={onEdit} className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
          Edit
        </button>
        <button onClick={onDelete} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
};

export default LogoItem;
