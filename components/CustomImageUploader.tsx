import React, { useState, useCallback, useRef, useEffect } from 'react';
import { fileToBase64 } from '../utils/fileUtils';
import { UploadIcon } from './icons/UploadIcon';

interface CustomImageUploaderProps {
    onImageUpload: (image: { file: File; base64: string } | null) => void;
    image: { file: File; base64: string } | null;
}

export const CustomImageUploader: React.FC<CustomImageUploaderProps> = ({ onImageUpload, image }) => {
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (image) {
            const url = URL.createObjectURL(image.file);
            setImagePreview(url);
            // Clean up the object URL when the component unmounts or the image changes
            return () => URL.revokeObjectURL(url);
        } else {
            setImagePreview(null);
        }
    }, [image]);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload a valid image file.');
                onImageUpload(null);
                return;
            }
            setError(null);
            try {
                const base64 = await fileToBase64(file);
                onImageUpload({ file, base64 });
            } catch (err) {
                setError('Could not process the file.');
                onImageUpload(null);
            }
        }
    }, [onImageUpload]);

    const handleAreaClick = () => {
        fileInputRef.current?.click();
    };

    const handleClearClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onImageUpload(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div 
            className="w-full p-6 border-2 border-dashed border-base-300 rounded-lg text-center cursor-pointer transition-colors hover:border-brand-primary hover:bg-base-200"
            onClick={handleAreaClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            {imagePreview ? (
                <div className="flex flex-col items-center relative">
                    <img src={imagePreview} alt="Image Preview" className="max-h-32 mb-4 rounded" />
                    <p className="text-gray-400">Click to change background image</p>
                    <button 
                        onClick={handleClearClick}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-base-300 text-white rounded-full h-6 w-6 flex items-center justify-center text-lg font-bold hover:bg-red-500"
                        aria-label="Clear image"
                    >
                        &times;
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <UploadIcon />
                    <p className="mt-2 text-lg">Click or drag to upload</p>
                    <p className="text-sm text-gray-500">PNG, JPG, etc.</p>
                </div>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};
