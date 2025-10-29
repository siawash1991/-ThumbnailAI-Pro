import React from 'react';
import { ImageFile } from '../types';

interface CanvasProps {
  mainImage: ImageFile | null;
  elementImages: ImageFile[];
  generatedThumbnails: string[] | null;
}

const Canvas: React.FC<CanvasProps> = ({ mainImage, elementImages, generatedThumbnails }) => {
  return (
    <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden relative">
      {generatedThumbnails && generatedThumbnails.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 w-full h-full p-2">
            {generatedThumbnails.map((src, index) => (
                 <div key={index} className="relative group w-full h-full bg-gray-300 dark:bg-gray-600 rounded-lg overflow-hidden">
                    <img src={src} alt={`Generated Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                     <a 
                        href={src} 
                        download={`thumbnail-variant-${index + 1}.png`}
                        className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Download variant ${index + 1}`}
                    >
                       <i className="fa-solid fa-download"></i>
                    </a>
                </div>
            ))}
        </div>
      ) : (
        <>
            <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                <i className="fa-solid fa-image text-5xl mb-4"></i>
                <p className="font-semibold">Your thumbnails will appear here</p>
                <p className="text-sm">Upload images, describe your vision, and choose a style to get started.</p>
            </div>
            {mainImage && (
                <div className="absolute top-4 left-4 w-1/3 max-w-[150px] bg-white p-1 rounded-md shadow-lg opacity-80">
                    <img src={mainImage.preview} alt="Main subject preview" className="w-full h-full object-cover rounded" />
                    <p className="text-xs text-center bg-black bg-opacity-50 text-white absolute bottom-1 left-1 right-1 rounded-b-sm py-0.5">Subject</p>
                </div>
            )}
            {elementImages.length > 0 && (
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {elementImages.map((img, index) => (
                         <div key={index} className="w-14 h-14 bg-white p-1 rounded-md shadow-lg opacity-80 relative">
                            <img src={img.preview} alt={`Element ${index + 1} preview`} className="w-full h-full object-contain" />
                            <p className="text-xs text-center bg-black bg-opacity-50 text-white absolute bottom-1 left-1 right-1 rounded-b-sm py-0.5">Element</p>
                        </div>
                    ))}
                </div>
            )}
        </>
      )}
    </div>
  );
};

export default Canvas;