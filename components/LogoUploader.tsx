
import React, { useState, useCallback, useRef } from 'react';
import { fileToBase64 } from '../utils/fileUtils';
import { UploadIcon } from './icons/UploadIcon';

interface LogoUploaderProps {
    onLogoUpload: (logo: { file: File; base64: string } | null) => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ onLogoUpload }) => {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload a valid image file.');
                onLogoUpload(null);
                setLogoPreview(null);
                return;
            }
            setError(null);
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
            try {
                const base64 = await fileToBase64(file);
                onLogoUpload({ file, base64 });
            } catch (err) {
                setError('Could not process the file.');
                onLogoUpload(null);
            }
        }
    }, [onLogoUpload]);

    const handleAreaClick = () => {
        fileInputRef.current?.click();
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
            {logoPreview ? (
                <div className="flex flex-col items-center">
                    <img src={logoPreview} alt="Logo Preview" className="max-h-32 mb-4 rounded" />
                    <p className="text-gray-400">Click again to change logo</p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <UploadIcon />
                    <p className="mt-2 text-lg">Click or drag to upload logo</p>
                    <p className="text-sm text-gray-500">PNG, JPG, etc.</p>
                </div>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};
