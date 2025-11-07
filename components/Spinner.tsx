
import React from 'react';

export const Spinner: React.FC = () => {
    return (
        <div className="absolute inset-0 bg-base-200 bg-opacity-75 flex flex-col items-center justify-center z-10 rounded-lg">
            <div className="w-16 h-16 border-4 border-t-brand-primary border-base-300 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold">AI is thinking...</p>
        </div>
    );
};
