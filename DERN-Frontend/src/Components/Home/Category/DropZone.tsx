import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

const DropZone: React.FC<{ onDrop: (files: File[]) => void }> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer rounded-lg"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p className="flex items-center justify-center gap-2 text-gray-600">
          <Upload className="w-5 h-5" /> Drag & drop or click to upload image
        </p>
      )}
    </div>
  );
};

export default DropZone;
