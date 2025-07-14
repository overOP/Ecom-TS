import React from "react";

interface AdvertisementItemProps {
  title: string;
  subtitle: string;
  paragraph: string;
  date: string;
  imageUrl: string;
  onEdit: () => void;
  onDelete: () => void;
}

const AdvertisementItem: React.FC<AdvertisementItemProps> = ({
  title,
  subtitle,
  paragraph,
  date,
  imageUrl,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
          <p className="text-gray-600 mt-2 whitespace-pre-line">{paragraph}</p>
          <p className="text-sm text-gray-400 mt-1">Date: {date}</p>
        </div>
        <img src={imageUrl} alt="ad" className="w-24 h-24 object-contain ml-4" />
      </div>
      <div className="mt-4 space-x-2">
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

export default AdvertisementItem;
