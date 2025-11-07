import React, { useRef, useEffect, useState } from 'react';
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
    const [renderTrigger, setRenderTrigger] = useState(0);

    // Re-render the canvas when the window is resized to ensure it's not pixelated
    useEffect(() => {
        const handleResize = () => {
            // A simple trigger is sufficient here, though debouncing could be an optimization
            setRenderTrigger(Date.now());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !mockupImage) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = `data:image/jpeg;base64,${mockupImage}`;

        const renderCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const parent = canvas.parentElement;
            if (!parent) return;

            // Get the display size from the parent element
            const rect = parent.getBoundingClientRect();

            // Set the canvas internal resolution to match display size, scaled by device pixel ratio for high-DPI screens
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Replicate CSS `object-contain` behavior by calculating the correct render dimensions
            const imageAspectRatio = img.naturalWidth / img.naturalHeight;
            const canvasAspectRatio = canvas.width / canvas.height;
            
            let renderWidth = canvas.width;
            let renderHeight = canvas.height;
            let x = 0;
            let y = 0;

            if (imageAspectRatio > canvasAspectRatio) { // Image is wider than canvas
                renderHeight = canvas.width / imageAspectRatio;
                y = (canvas.height - renderHeight) / 2;
            } else { // Image is taller or same aspect ratio
                renderWidth = canvas.height * imageAspectRatio;
                x = (canvas.width - renderWidth) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Apply filters
            ctx.filter = `brightness(${imageFilters.brightness}%) contrast(${imageFilters.contrast}%) saturate(${imageFilters.saturation}%)`;
            
            // Draw the image with high quality settings
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, x, y, renderWidth, renderHeight);

            // Apply text overlay
            if (textOverlay.text) {
                ctx.filter = 'none'; // Reset filter before drawing text

                // Scale font size relative to the rendered image height for consistent appearance
                const scaledFontSize = (textOverlay.size / 1024) * renderHeight;
                ctx.font = `bold ${scaledFontSize}px sans-serif`;
                ctx.fillStyle = textOverlay.color;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                const strokeColor = textOverlay.color === '#000000' ? '#FFFFFF' : '#000000';
                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = Math.max(1 * dpr, scaledFontSize / 20); // Scale line width for high-DPI

                const textX = canvas.width / 2;
                const textY = canvas.height / 2;
                
                ctx.strokeText(textOverlay.text, textX, textY);
                ctx.fillText(textOverlay.text, textX, textY);
            }
        };
        
        // Render if image is already loaded (e.g., from cache), otherwise wait for onload
        if (img.complete) {
            renderCanvas();
        } else {
            img.onload = renderCanvas;
        }

    }, [mockupImage, imageFilters, textOverlay, renderTrigger]);
    
    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        // Use PNG for high-quality, lossless export suitable for printing
        link.href = canvas.toDataURL('image/png');
        link.download = 'ai-merch-mockup-edited.png';
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
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
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