import React from 'react';

interface AspectRatioSelectorProps {
    selectedAspectRatio: string;
    onSelectAspectRatio: (ratio: string) => void;
}

const ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4'];

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedAspectRatio, onSelectAspectRatio }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Aspect Ratio</h3>
            <div className="flex flex-wrap gap-3">
                {ASPECT_RATIOS.map((ratio) => (
                    <button
                        key={ratio}
                        onClick={() => onSelectAspectRatio(ratio)}
                        className={`
                            px-4 py-2 border-2 rounded-lg font-semibold transition-all duration-200
                            ${selectedAspectRatio === ratio
                                ? 'bg-brand-primary border-brand-primary text-white'
                                : 'bg-base-200 border-base-300 text-base-content hover:border-brand-secondary'
                            }
                        `}
                    >
                        {ratio}
                    </button>
                ))}
            </div>
        </div>
    );
};