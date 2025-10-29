
import React from 'react';
import { StyleTemplate } from '../types';

interface StyleSelectorProps {
  styles: StyleTemplate[];
  selectedStyle: StyleTemplate;
  onSelectStyle: (style: StyleTemplate) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {styles.map((style) => (
        <button
          key={style.style_id}
          onClick={() => onSelectStyle(style)}
          className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
            selectedStyle.style_id === style.style_id ? 'border-red-500 scale-105' : 'border-transparent hover:border-red-400'
          }`}
        >
          <img src={style.preview_image_url} alt={style.name} className="w-full h-16 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-1">
            <p className="text-white text-xs font-semibold">{style.name}</p>
          </div>
          {selectedStyle.style_id === style.style_id && (
            <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              <i className="fas fa-check text-xs"></i>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;
