import React from 'react';
import type { ImageFilters, TextOverlay } from '../types';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { ResetIcon } from './icons/ResetIcon';

interface ImageEditorProps {
    editPrompt: string;
    onEditPromptChange: (prompt: string) => void;
    onEditImage: () => void;
    imageFilters: ImageFilters;
    onImageFiltersChange: (filters: ImageFilters) => void;
    textOverlay: TextOverlay;
    onTextOverlayChange: (overlay: TextOverlay) => void;
    onResetEdits: () => void;
}

const AIPromptEditor: React.FC<Pick<ImageEditorProps, 'editPrompt' | 'onEditPromptChange' | 'onEditImage'>> = ({ editPrompt, onEditPromptChange, onEditImage }) => (
    <div>
        <label htmlFor="edit-prompt" className="block text-sm font-medium text-gray-400 mb-2">
            Edit with AI (e.g., "change the background to a beach")
        </label>
        <div className="flex gap-2">
            <input
                id="edit-prompt"
                type="text"
                value={editPrompt}
                onChange={(e) => onEditPromptChange(e.target.value)}
                placeholder="Describe your edit..."
                className="flex-grow bg-base-300 border border-gray-600 rounded-lg px-3 py-2 text-base-content focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <button
                onClick={onEditImage}
                disabled={!editPrompt}
                className="bg-brand-secondary text-white p-3 rounded-lg flex items-center justify-center disabled:bg-gray-500 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
                aria-label="Apply AI Edit"
            >
                <MagicWandIcon />
            </button>
        </div>
    </div>
);

const ManualAdjustments: React.FC<Omit<ImageEditorProps, 'editPrompt' | 'onEditPromptChange' | 'onEditImage'>> = (props) => {
    const { imageFilters, onImageFiltersChange, textOverlay, onTextOverlayChange, onResetEdits } = props;

    const handleFilterChange = (key: keyof ImageFilters, value: string) => {
        onImageFiltersChange({ ...imageFilters, [key]: Number(value) });
    };

    const handleTextChange = (key: keyof TextOverlay, value: string | number) => {
        onTextOverlayChange({ ...textOverlay, [key]: value });
    };

    return (
        <div className="bg-base-200 p-4 rounded-lg mt-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Manual Adjustments</h3>
                 <button onClick={onResetEdits} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-base-300">
                     <ResetIcon />
                     Reset
                 </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                    <label htmlFor="brightness" className="block text-sm text-gray-400">Brightness ({imageFilters.brightness}%)</label>
                    <input id="brightness" type="range" min="0" max="200" value={imageFilters.brightness} onChange={(e) => handleFilterChange('brightness', e.target.value)} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-brand-primary" />
                </div>
                 <div>
                    <label htmlFor="contrast" className="block text-sm text-gray-400">Contrast ({imageFilters.contrast}%)</label>
                    <input id="contrast" type="range" min="0" max="200" value={imageFilters.contrast} onChange={(e) => handleFilterChange('contrast', e.target.value)} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-brand-primary" />
                </div>
                 <div>
                    <label htmlFor="saturation" className="block text-sm text-gray-400">Saturation ({imageFilters.saturation}%)</label>
                    <input id="saturation" type="range" min="0" max="200" value={imageFilters.saturation} onChange={(e) => handleFilterChange('saturation', e.target.value)} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-brand-primary" />
                </div>
            </div>

            {/* Text Overlay */}
            <div>
                 <label className="block text-sm font-medium text-gray-400 mb-2">Text Overlay</label>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input type="text" placeholder="Add text..." value={textOverlay.text} onChange={(e) => handleTextChange('text', e.target.value)} className="sm:col-span-2 bg-base-300 border border-gray-600 rounded-lg px-3 py-2 text-base-content focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    <div className="flex gap-2">
                         <input type="number" value={textOverlay.size} onChange={(e) => handleTextChange('size', Number(e.target.value))} min="8" className="w-full bg-base-300 border border-gray-600 rounded-lg px-3 py-2 text-base-content focus:outline-none focus:ring-2 focus:ring-brand-primary" title="Font size" />
                         <input type="color" value={textOverlay.color} onChange={(e) => handleTextChange('color', e.target.value)} className="w-full h-full bg-base-300 border border-gray-600 rounded-lg cursor-pointer" title="Font color" />
                    </div>
                 </div>
            </div>
        </div>
    );
};


export const ImageEditor: React.FC<ImageEditorProps> = (props) => {
    return (
        <div className="mt-4">
            <AIPromptEditor {...props} />
            <ManualAdjustments {...props} />
        </div>
    );
};