import { Upload } from "lucide-react";
import { useState, useCallback } from "react";
import { addToast } from "../../utils/toasterStore";

interface PhotoUploadProps {
    logoUrl?: string;
    onPhotoChange: (file: File) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ logoUrl, onPhotoChange }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                const file = files[0];
                if (file.type.startsWith("image/")) {
                    onPhotoChange(file);
                } else {
                    addToast("Please upload an image file");
                }
            }
        },
        [onPhotoChange]
    );

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                onPhotoChange(file);
            } else {
                addToast("Please upload an image file");
            }
        }
    };

    return (
        <div className="mb-6">
            <label className="block text-color_brand text-sm font-bold mb-2">
                Company Logo
            </label>
            <div
                className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
                    } ${logoUrl ? "h-64" : "h-40"}`}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {logoUrl ? (
                    <div className="h-full flex flex-col items-center justify-center">
                        <img
                            src={logoUrl}
                            alt="Company"
                            className="max-h-48 max-w-full object-contain mb-2"
                        />
                        <p className="text-sm text-gray-500">Drag new image to replace</p>
                        <label
                            htmlFor="file-upload"
                            className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600"
                        >
                            Browse files
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileInput}
                        />
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center">
                        <Upload className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-gray-600">Drag and drop your company logo here</p>
                        <p className="text-sm text-gray-500 mt-1">or</p>
                        <label
                            htmlFor="file-upload"
                            className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600"
                        >
                            Browse files
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileInput}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoUpload;
