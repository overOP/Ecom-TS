import React from "react";

interface BannerItemProps {
  title: string;
  subtitle: string;
  url: string;
  logoUrl: string;
  onEdit: () => void;
  onDelete: () => void;
}

const BannerItem: React.FC<BannerItemProps> = ({ title, subtitle, url, logoUrl, onEdit, onDelete }) => {
  return (
    <div className="flex items-center p-4 border rounded shadow-sm mb-4 justify-between">
      <div className="flex items-center">
        <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain mr-4 rounded-full" />
        <div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold text-lg hover:underline">
            {title}
          </a>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
      <div className="space-x-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-white"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BannerItem;
