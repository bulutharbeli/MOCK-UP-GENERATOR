
import React, { useState, useCallback } from 'react';
import { LogoUploader } from './components/LogoUploader';
import { ProductSelector } from './components/ProductSelector';
import { MockupDisplay } from './components/MockupDisplay';
import { Header } from './components/Header';
import { generateMockup, editImage } from './services/geminiService';
import type { ProductCategory, ProductVariant, ImageFilters, TextOverlay } from './types';
import { MagicWandIcon } from './components/icons/MagicWandIcon';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { ImageEditor } from './components/ImageEditor';
import { CustomImageUploader } from './components/CustomImageUploader';

const App: React.FC = () => {
    const [logo, setLogo] = useState<{ file: File; base64: string } | null>(null);
    const [customImage, setCustomImage] = useState<{ file: File; base64: string } | null>(null);
    const [customPrompt, setCustomPrompt] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [mockupImage, setMockupImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [editPrompt, setEditPrompt] = useState<string>('');
    const [aspectRatio, setAspectRatio] = useState<string>('1:1');

    // State for client-side image edits
    const [imageFilters, setImageFilters] = useState<ImageFilters>({ brightness: 100, contrast: 100, saturation: 100 });
    const [textOverlay, setTextOverlay] = useState<TextOverlay>({ text: '', color: '#FFFFFF', size: 48 });

    const resetImageEdits = useCallback(() => {
        setImageFilters({ brightness: 100, contrast: 100, saturation: 100 });
        setTextOverlay({ text: '', color: '#FFFFFF', size: 48 });
    }, []);
    
    const handleCustomImageUpload = useCallback((image: { file: File; base64: string } | null) => {
        setCustomImage(image);
        if (image) {
            setSelectedCategory(null);
            setSelectedVariant(null);
        } else {
            setCustomPrompt('');
        }
    }, []);

    const handleSelectCategory = useCallback((category: ProductCategory) => {
        setSelectedCategory(category);
        setSelectedVariant(null); // Reset variant when category changes
        setCustomImage(null); // Clear custom image when product is selected
        setCustomPrompt(''); // And clear the custom prompt
    }, []);


    const handleGenerateMockup = useCallback(async () => {
        if (!logo) {
            setError('Please upload a logo.');
            return;
        }
        if (!selectedVariant && !customImage) {
            setError('Please select a product or upload your own background image.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setMockupImage(null);
        resetImageEdits();

        try {
            let prompt: string;
            let imageToUse: { base64: string, mimeType: string } | undefined;
            
            if (customImage) {
                const basePrompt = 'This is a product mockup generation task. The first image is the product. The second image is the logo. Place the logo onto the product in the first image in a photorealistic way. The logo should appear as if it were naturally printed or attached to the product. Maintain the original aspect ratio of the product image.';
                if (customPrompt) {
                    prompt = `${basePrompt} The user has provided specific instructions for placement: "${customPrompt}". Please follow these instructions carefully.`;
                } else {
                    prompt = basePrompt;
                }
                imageToUse = { base64: customImage.base64, mimeType: customImage.file.type };
            } else if (selectedVariant) {
                let aspectRatioDescription: string;
                switch (aspectRatio) {
                    case '16:9':
                        aspectRatioDescription = 'The final image must be a wide, landscape-orientation photograph with a 16:9 aspect ratio.';
                        break;
                    case '9:16':
                        aspectRatioDescription = 'The final image must be a tall, portrait-orientation photograph with a 9:16 aspect ratio.';
                        break;
                    case '4:3':
                        aspectRatioDescription = 'The final image must be a landscape-orientation photograph with a 4:3 aspect ratio.';
                        break;
                    case '3:4':
                        aspectRatioDescription = 'The final image must be a portrait-orientation photograph with a 3:4 aspect ratio.';
                        break;
                    case '1:1':
                    default:
                        aspectRatioDescription = 'The final image must be a square photograph with a 1:1 aspect ratio.';
                        break;
                }
                prompt = `${selectedVariant.prompt}. ${aspectRatioDescription} This is a strict requirement.`;
            } else {
                setError('An unexpected error occurred. Please try again.');
                setIsLoading(false);
                return;
            }

            const result = await generateMockup(logo.base64, logo.file.type, prompt, imageToUse);
            setMockupImage(result);
        } catch (err) {
            console.error(err);
            setError('Failed to generate mockup. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [logo, selectedVariant, customImage, customPrompt, aspectRatio, resetImageEdits]);

    const handleEditImage = useCallback(async () => {
        if (!mockupImage || !editPrompt) {
            setError('There is no image to edit or the prompt is empty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        resetImageEdits();

        try {
            // A common image format for web is jpeg
            const result = await editImage(mockupImage, 'image/jpeg', editPrompt);
            setMockupImage(result);
            setEditPrompt('');
        } catch (err) {
            console.error(err);
            setError('Failed to edit image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [mockupImage, editPrompt, resetImageEdits]);

    const isGenerateDisabled = !logo || (!selectedVariant && !customImage) || isLoading;

    return (
        <div className="min-h-screen bg-base-100 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Controls Column */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">1. Upload Your Logo</h2>
                            <LogoUploader onLogoUpload={setLogo} />
                        </div>

                        <div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-base-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-base-100 px-2 text-sm text-gray-500 uppercase">Or</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-300 mt-4 mb-4 text-center">Use your own product image</h3>
                            <CustomImageUploader onImageUpload={handleCustomImageUpload} image={customImage} />
                            {customImage && (
                                <div className="mt-4">
                                    <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-400 mb-2">
                                        Placement Instructions (e.g., "on the golf ball")
                                    </label>
                                    <input
                                        id="custom-prompt"
                                        type="text"
                                        value={customPrompt}
                                        onChange={(e) => setCustomPrompt(e.target.value)}
                                        placeholder="Describe where to place the logo..."
                                        className="w-full bg-base-200 border border-base-300 rounded-lg px-3 py-2 text-base-content focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                        aria-describedby="custom-prompt-description"
                                    />
                                    <p id="custom-prompt-description" className="text-xs text-gray-500 mt-1">Help the AI by telling it where to put the logo on your image.</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">2. Select a Product</h2>
                             <div className={customImage ? 'opacity-50 pointer-events-none' : 'transition-opacity'}>
                                <ProductSelector
                                    selectedCategory={selectedCategory}
                                    onSelectCategory={handleSelectCategory}
                                    selectedVariant={selectedVariant}
                                    onSelectVariant={setSelectedVariant}
                                />
                             </div>
                              {customImage && (
                                <div className="mt-4 p-3 bg-yellow-900 bg-opacity-30 border border-yellow-700 text-yellow-300 text-sm rounded-lg">
                                    Product selection is disabled when using a custom image. <button onClick={() => handleCustomImageUpload(null)} className="font-bold underline hover:text-yellow-100">Clear image</button> to enable.
                                </div>
                            )}
                        </div>
                        <div className="bg-base-200 rounded-lg p-6 shadow-lg">
                             <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">3. Generate Mockup</h2>
                             <div className="mb-6">
                                <AspectRatioSelector
                                    selectedAspectRatio={aspectRatio}
                                    onSelectAspectRatio={setAspectRatio}
                                />
                            </div>
                             <p className="text-gray-400 mb-6">Once you have a logo and a product, let our AI create your mockup!</p>
                             <button
                                onClick={handleGenerateMockup}
                                disabled={isGenerateDisabled}
                                className={`w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                                    isGenerateDisabled
                                        ? 'bg-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-2xl'
                                }`}
                            >
                                <MagicWandIcon />
                                {isLoading && !mockupImage ? 'Generating...' : 'Generate Mockup'}
                            </button>
                        </div>
                    </div>

                    {/* Display Column */}
                    <div className="flex flex-col">
                         <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">4. Your AI-Generated Mockup</h2>
                        <MockupDisplay
                            mockupImage={mockupImage}
                            isLoading={isLoading}
                            aspectRatio={aspectRatio}
                            imageFilters={imageFilters}
                            textOverlay={textOverlay}
                        />
                         {mockupImage && !isLoading && (
                            <ImageEditor
                                editPrompt={editPrompt}
                                onEditPromptChange={setEditPrompt}
                                onEditImage={handleEditImage}
                                imageFilters={imageFilters}
                                onImageFiltersChange={setImageFilters}
                                textOverlay={textOverlay}
                                onTextOverlayChange={setTextOverlay}
                                onResetEdits={resetImageEdits}
                            />
                        )}
                    </div>
                </div>

                {error && (
                    <div className="fixed bottom-5 right-5 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg">
                        <p>{error}</p>
                        <button onClick={() => setError(null)} className="absolute top-0 right-1 text-xl">&times;</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
