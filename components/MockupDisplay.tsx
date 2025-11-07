import React, { useRef, useEffect } from 'react';
import { Spinner } from './Spinner';
import { DownloadIcon } from './icons/DownloadIcon';
import type { ImageFilters, TextOverlay } from '../types';

interface MockupDisplayProps {
    mockupImage: string | null;
    isLoading: boolean;
    aspectRatio: string;
    imageFilters: ImageFilters;
    textOverlay: TextOverlay;
}

const getAspectRatioClass = (ratio: string): string => {
    switch (ratio) {
        case '1:1':
            return 'aspect-square';
        case '16:9':
            return 'aspect-video';
        case '9:16':
            return 'aspect-[9/16]';
        case '4:3':
            return 'aspect-[4/3]';
        case '3:4':
            return 'aspect-[3/4]';
        default:
            return 'aspect-square';
    }
};

export const MockupDisplay: React.FC<MockupDisplayProps> = ({ mockupImage, isLoading, aspectRatio, imageFilters, textOverlay }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !mockupImage) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = `data:image/jpeg;base64,${mockupImage}`;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.filter = `brightness(${imageFilters.brightness}%) contrast(${imageFilters.contrast}%) saturate(${imageFilters.saturation}%)`;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            if (textOverlay.text) {
                ctx.filter = 'none';
                ctx.font = `bold ${textOverlay.size}px sans-serif`;
                ctx.fillStyle = textOverlay.color;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                const strokeColor = textOverlay.color === '#000000' ? '#FFFFFF' : '#000000';
                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = Math.max(1, textOverlay.size / 20);

                ctx.strokeText(textOverlay.text, canvas.width / 2, canvas.height / 2);
                ctx.fillText(textOverlay.text, canvas.width / 2, canvas.height / 2);
            }
        };
    }, [mockupImage, imageFilters, textOverlay]);
    
    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.download = 'ai-merch-mockup-edited.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <div className={`w-full ${getAspectRatioClass(aspectRatio)} bg-base-200 rounded-lg flex items-center justify-center p-4 relative shadow-inner`}>
            {isLoading && <Spinner />}
            {!isLoading && !mockupImage && (
                 <div className="text-center text-gray-500">
                    <p className="text-xl">Your mockup will appear here</p>
                    <p>Follow the steps to get started</p>
                </div>
            )}
            {mockupImage && (
                <div className="w-full h-full relative">
                    <canvas ref={canvasRef} className="w-full h-full object-contain" />
                    <button
                        onClick={handleDownload}
                        className="absolute top-2 right-2 bg-base-100 bg-opacity-70 text-white p-2 rounded-full hover:bg-brand-primary transition-colors"
                        aria-label="Download Image"
                    >
                       <DownloadIcon />
                    </button>
                </div>
            )}
        </div>
    );
};