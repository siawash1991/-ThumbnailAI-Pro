import React, { useState, useCallback } from 'react';
import { ImageFile, StyleTemplate } from './types';
import { STYLE_TEMPLATES } from './constants';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import Canvas from './components/Canvas';
import Loader from './components/Loader';
import { generateThumbnail } from './services/geminiService';

const App: React.FC = () => {
  const [mainImage, setMainImage] = useState<ImageFile | null>(null);
  const [elementImages, setElementImages] = useState<ImageFile[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<StyleTemplate>(STYLE_TEMPLATES[0]);
  const [thumbnailText, setThumbnailText] = useState<string>('');
  const [isTextEnabled, setIsTextEnabled] = useState<boolean>(true);
  const [layoutDescription, setLayoutDescription] = useState<string>('');
  const [generatedThumbnails, setGeneratedThumbnails] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (!mainImage) {
      setError('Please upload a main image.');
      return;
    }
     if (isTextEnabled && !thumbnailText.trim()) {
      setError('If text is included, it cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedThumbnails(null);

    const textToSend = isTextEnabled ? thumbnailText : '';

    try {
      const results = await generateThumbnail(mainImage, elementImages, selectedStyle, textToSend, layoutDescription);
      const formattedResults = results.map(res => `data:image/png;base64,${res}`);
      setGeneratedThumbnails(formattedResults);
    } catch (e) {
      console.error(e);
      setError('Failed to generate thumbnails. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [mainImage, elementImages, selectedStyle, thumbnailText, layoutDescription, isTextEnabled]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      {isLoading && <Loader />}
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Controls Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">1. Upload Images</h2>
              <div className="space-y-4">
                <ImageUploader
                  label="Main Image (Your Face)"
                  onImageUpload={setMainImage}
                  id="main-image"
                />
                 <p className="text-xs text-amber-500 mt-2 p-2 bg-amber-500/10 rounded-lg">
                  <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                  IMPORTANT: The person in this image will appear in your thumbnail!
                </p>
                <ImageUploader
                  label="Elements (Logo, etc.)"
                  onImageUpload={(img) => setElementImages(prev => [...prev, img].slice(0, 3))}
                  id="element-images"
                  multiple
                  maxFiles={3}
                  currentFiles={elementImages}
                  onRemoveFile={(index) => setElementImages(prev => prev.filter((_, i) => i !== index))}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">2. Describe Your Vision</h2>
                <textarea
                    value={layoutDescription}
                    onChange={(e) => setLayoutDescription(e.target.value)}
                    placeholder="e.g., Put my face on the left, surprised. Add the logo to the top right. Make the background blue with lightning."
                    rows={4}
                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Describe the layout, poses, and background. The AI will follow your instructions.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">3. Choose a Style</h2>
              <StyleSelector
                styles={STYLE_TEMPLATES}
                selectedStyle={selectedStyle}
                onSelectStyle={setSelectedStyle}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">4. Add Text</h2>
                    <div className="flex items-center">
                         <input
                            type="checkbox"
                            id="text-toggle"
                            checked={isTextEnabled}
                            onChange={(e) => setIsTextEnabled(e.target.checked)}
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="text-toggle" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Include Text
                        </label>
                    </div>
                </div>
                <textarea
                    value={thumbnailText}
                    onChange={(e) => setThumbnailText(e.target.value)}
                    placeholder={isTextEnabled ? "e.g., EPIC NEW GADGET!" : "No text will be added"}
                    rows={3}
                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isTextEnabled}
                />
            </div>
          </div>

          {/* Canvas and Action Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg sticky top-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Preview & Generate</h2>
              <Canvas 
                mainImage={mainImage}
                elementImages={elementImages}
                generatedThumbnails={generatedThumbnails}
              />
              {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
              <button
                onClick={handleGenerateClick}
                disabled={isLoading || !mainImage || (isTextEnabled && !thumbnailText.trim())}
                className="w-full mt-6 py-4 px-6 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center gap-3"
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                {isLoading ? 'Generating...' : 'Generate 2 Thumbnails'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;