import React from 'react';
import { Language } from '../types';
import { getTexts } from '../translations';

interface ImageUploaderProps {
  image: string | null;
  onImageChange: (image: string | null) => void;
  lang: Language;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageChange, lang }) => {
  const t = getTexts(lang);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onImageChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {t.uploadLabel}
      </label>
      
      {!image ? (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-800 border-dashed rounded-md cursor-pointer bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-3 text-zinc-500 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="mb-1 text-xs text-zinc-400 group-hover:text-zinc-200"><span className="font-semibold">{t.clickToUpload}</span> {t.productImage}</p>
            <p className="text-[10px] text-zinc-600">{t.autoDetect}</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="relative w-full h-48 rounded-md overflow-hidden border border-zinc-800 group">
          <img src={image} alt="Product Sample" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button 
                onClick={handleRemove}
                className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm transition-transform hover:scale-110"
                title="Remove image"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
             </button>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-yellow-500 font-mono border border-yellow-500/30">
             {t.analyzing}
          </div>
        </div>
      )}
    </div>
  );
};