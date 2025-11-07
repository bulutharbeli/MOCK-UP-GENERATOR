
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-base-200 shadow-lg">
            <div className="container mx-auto px-4 md:px-8 py-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                    AI Merch Mockup Generator
                </h1>
                <p className="text-gray-400 mt-1">Instant mockups powered by Gemini</p>
            </div>
        </header>
    );
};
