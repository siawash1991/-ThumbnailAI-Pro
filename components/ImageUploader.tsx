
import React, { useCallback, useRef } from 'react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  label: string;
  id: string;
  onImageUpload: (imageFile: ImageFile) => void;
  multiple?: boolean;
  maxFiles?: number;
  currentFiles?: ImageFile[];
  onRemoveFile?: (index: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, id, onImageUpload, multiple = false, maxFiles, currentFiles, onRemoveFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          onImageUpload({
            file,
            preview: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  
  const canUploadMore = !multiple || !maxFiles || (currentFiles && currentFiles.length < maxFiles);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <div className="flex flex-col gap-4">
        {currentFiles && currentFiles.length > 0 && (
          <div className={`grid gap-2 ${multiple ? 'grid-cols-3' : 'grid-cols-1'}`}>
            {currentFiles.map((imageFile, index) => (
              <div key={index} className="relative group">
                <img src={imageFile.preview} alt="Preview" className={`w-full ${multiple ? 'h-20' : 'h-32'} object-cover rounded-lg`} />
                {onRemoveFile && (
                  <button
                    onClick={() => onRemoveFile(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
         {(!multiple && currentFiles?.length === 0) || (multiple && canUploadMore) ? (
          <button
            type="button"
            onClick={handleButtonClick}
            className="w-full flex justify-center items-center px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:border-red-500 dark:hover:border-red-500 hover:text-red-500 dark:hover:text-red-500 transition"
          >
            <i className="fa-solid fa-upload mr-2"></i>
            Click to upload
          </button>
         ) : null}
        <input
          type="file"
          id={id}
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          multiple={multiple}
        />
      </div>
    </div>
  );
};


// A wrapper component to manage state for single and multiple file uploaders
const UploaderWrapper: React.FC<Omit<ImageUploaderProps, 'currentFiles' | 'onRemoveFile' | 'onImageUpload'> & { onImageUpload: (file: ImageFile | null) => void; multiple?: false } | Omit<ImageUploaderProps, 'currentFiles' | 'onRemoveFile' | 'onImageUpload'> & { onImageUpload: (file: ImageFile) => void; multiple: true; maxFiles: number; currentFiles: ImageFile[]; onRemoveFile: (index: number) => void; }> = (props) => {
    if (props.multiple) {
        return <ImageUploader {...props} />;
    }

    const [file, setFile] = React.useState<ImageFile | null>(null);

    const handleUpload = (imageFile: ImageFile) => {
        setFile(imageFile);
        props.onImageUpload(imageFile);
    };
    
    const handleRemove = () => {
        setFile(null);
        props.onImageUpload(null);
    };

    return (
        <ImageUploader 
            {...props} 
            onImageUpload={handleUpload}
            currentFiles={file ? [file] : []}
            onRemoveFile={() => handleRemove()}
        />
    );
};


export default UploaderWrapper;
