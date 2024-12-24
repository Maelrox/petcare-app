import { Upload, X } from "lucide-react";
import { useState, useCallback } from "react";
import type { FormField } from "../../../types/FormType";

interface FileUploadProps<T, U, K> {
    field: FormField<T, U, K>;
    formData: T;
    handleInputChange: (name: keyof T | undefined, value: any) => void;
    isEdit: boolean;
  }

  export function FileUpload<T extends Record<string, any>, U, K>({
    field,
    formData,
    handleInputChange,
    isEdit
  }: FileUploadProps<T, U, K>) {
    const [isDragging, setIsDragging] = useState(false);
  
    const handleDrag = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);
  
    const handleDragIn = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    }, []);
  
    const handleDragOut = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }, []);
  
    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
  
      const files = Array.from(e.dataTransfer.files);
      if (files?.length > 0) {
        const file = files[0];
        if (field.fileAcceptedTypes) {
          const acceptedTypes = field.fileAcceptedTypes.split(',');
          const fileType = `.${file.name.split('.').pop()}`;
          if (!acceptedTypes.includes(fileType)) {
            alert('File type not accepted');
            return;
          }
        }
        handleInputChange(field.name, file);
      }
    }, [field, handleInputChange]);
  
    return (
      <div className="relative">
        <label
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-32 border-2 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
          } ${
            isDragging ? 'border-solid' : 'border-dashed'
          } rounded-lg cursor-pointer hover:bg-gray-100 transition-colors`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className={`w-8 h-8 mb-2 ${isDragging ? 'text-blue-500' : 'text-gray-500'}`} />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {field.fileAcceptedTypes || "Any file type accepted"}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleInputChange(field.name, file);
              }
            }}
            accept={field.fileAcceptedTypes}
            required={field.required && isEdit}
          />
        </label>
        {formData[field.name] && (
          <div className="mt-2 flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600 truncate max-w-[80%]">
              {formData[field.name]?.name}
            </span>
            <button
              type="button"
              onClick={() => handleInputChange(field.name, null)}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Remove file"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    );
  }