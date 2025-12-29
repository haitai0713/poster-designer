import React, { useState, useEffect } from 'react';
import { PosterConfig, GenerationStatus, Language } from './types';
import { refinePromptWithGemini, generatePosterImage } from './services/geminiService';
import { InputGroup } from './components/InputGroup';
import { DropdownGroup } from './components/DropdownGroup';
import { ImageUploader } from './components/ImageUploader';
import { STYLES, LAYOUTS, ENVIRONMENTS } from './constants';
import { getTexts } from './translations';

const App: React.FC = () => {
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [lang, setLang] = useState<Language>('en');
  
  const [config, setConfig] = useState<PosterConfig>({
    productDescription: '',
    referenceImage: null,
    style: STYLES[0].value,
    layout: LAYOUTS[0].value,
    environment: ENVIRONMENTS[0].value,
    textOverlay: ''
  });

  const [refinedPrompt, setRefinedPrompt] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');

  const t = getTexts(lang);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(hasKey);
    } else {
        setHasApiKey(true);
    }
  };

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleGenerate = async () => {
    if ((!config.productDescription && !config.referenceImage) || !config.textOverlay) {
        setErrorMsg(t.errorMissingInput);
        return;
    }

    setErrorMsg('');
    setStatus(GenerationStatus.GENERATING_PROMPT);
    setRefinedPrompt('');
    setGeneratedImageUrl('');

    try {
      const prompt = await refinePromptWithGemini(config);
      setRefinedPrompt(prompt);
      
      setStatus(GenerationStatus.GENERATING_IMAGE);

      if (!hasApiKey) {
          await handleSelectKey();
      }
      
      const imageUrl = await generatePosterImage(prompt, config.referenceImage);
      setGeneratedImageUrl(imageUrl);
      setStatus(GenerationStatus.COMPLETED);

    } catch (err: any) {
      console.error(err);
      setStatus(GenerationStatus.ERROR);
      if (err.message && err.message.includes("Requested entity was not found")) {
          setHasApiKey(false);
          setErrorMsg(t.errorKeyInvalid);
      } else {
          setErrorMsg(t.errorGeneric);
      }
    }
  };

  const isProcessing = status === GenerationStatus.GENERATING_PROMPT || status === GenerationStatus.GENERATING_IMAGE;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 flex flex-col md:flex-row font-sans selection:bg-yellow-500/30">
      
      {/* Left Panel: Controls */}
      <div className="w-full md:w-[400px] lg:w-[450px] flex-shrink-0 border-r border-zinc-800 h-auto md:h-screen overflow-y-auto p-6 flex flex-col gap-6">
        <header>
          <div className="flex items-center justify-between mb-1 gap-4">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <h1 className="text-xl font-bold tracking-tight text-white uppercase">
                  {t.appTitle}
                </h1>
             </div>
             <button 
                onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                className="bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white px-2 py-1 rounded-full text-[10px] font-bold font-mono transition-colors whitespace-nowrap"
              >
                {lang === 'en' ? 'EN / 中文' : 'English / 中文'}
              </button>
          </div>
          <p className="text-xs text-zinc-500 font-mono">{t.appSubtitle}</p>
        </header>

        {!hasApiKey && (
          <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg">
             <p className="text-sm text-red-200 mb-3">{t.apiKeyMissing}</p>
             <button 
                onClick={handleSelectKey}
                className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-xs uppercase tracking-wider transition-colors"
             >
                {t.selectKeyBtn}
             </button>
             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="block mt-2 text-center text-[10px] text-zinc-500 underline">{t.billingDoc}</a>
          </div>
        )}

        <div className="flex flex-col gap-5">
            <ImageUploader 
              image={config.referenceImage}
              onImageChange={(img) => setConfig({...config, referenceImage: img})}
              lang={lang}
            />

            <InputGroup 
                label={t.descLabel}
                placeholder={t.descPlaceholder}
                value={config.productDescription}
                onChange={(v) => setConfig({...config, productDescription: v})}
                type="textarea"
            />

            <DropdownGroup 
              label={t.styleLabel}
              value={config.style}
              options={STYLES}
              onChange={(v) => setConfig({...config, style: v})}
              lang={lang}
              placeholder={t.selectOption}
            />

            <DropdownGroup 
              label={t.layoutLabel}
              value={config.layout}
              options={LAYOUTS}
              onChange={(v) => setConfig({...config, layout: v})}
              lang={lang}
              placeholder={t.selectOption}
            />

            <DropdownGroup 
              label={t.envLabel}
              value={config.environment}
              options={ENVIRONMENTS}
              onChange={(v) => setConfig({...config, environment: v})}
              lang={lang}
              placeholder={t.selectOption}
            />

             <InputGroup 
                label={t.textLabel} 
                placeholder={t.textPlaceholder}
                value={config.textOverlay}
                onChange={(v) => setConfig({...config, textOverlay: v})}
            />
        </div>

        <div className="mt-auto pt-6">
            {errorMsg && <p className="text-red-400 text-xs mb-3 font-mono">{errorMsg}</p>}
            
            <button
                disabled={isProcessing || !hasApiKey}
                onClick={handleGenerate}
                className={`w-full py-4 font-bold text-sm tracking-widest uppercase rounded-sm transition-all relative overflow-hidden group
                    ${isProcessing || !hasApiKey 
                        ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                        : 'bg-yellow-500 text-zinc-950 hover:bg-yellow-400'
                    }`}
            >
                {status === GenerationStatus.GENERATING_PROMPT && t.btnAnalyze}
                {status === GenerationStatus.GENERATING_IMAGE && t.btnRender}
                {status === GenerationStatus.IDLE && t.btnGenerate}
                {status === GenerationStatus.COMPLETED && t.btnRegenerate}
                {status === GenerationStatus.ERROR && t.btnRetry}
            </button>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="flex-1 bg-black relative flex flex-col h-[600px] md:h-screen">
        
        {/* Prompt Terminal Display */}
        {refinedPrompt && (
            <div className="absolute top-0 left-0 right-0 z-10 p-4 pointer-events-none">
                <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-4 rounded-md shadow-2xl max-w-2xl mx-auto pointer-events-auto">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{t.generatedInstruction}</span>
                        <span className="text-[10px] font-mono text-green-500">● {t.systemReady}</span>
                    </div>
                    <p className="font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
                        {refinedPrompt}
                    </p>
                </div>
            </div>
        )}

        {/* Main Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            
            {status === GenerationStatus.IDLE && (
                <div className="text-center opacity-30">
                    <div className="text-6xl mb-4">🍌</div>
                    <p className="font-mono text-sm tracking-widest uppercase">{t.waiting}</p>
                </div>
            )}

            {isProcessing && (
                <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-zinc-800 border-t-yellow-500 rounded-full animate-spin mb-6"></div>
                    <p className="font-mono text-xs text-yellow-500 animate-pulse uppercase tracking-widest">
                        {status === GenerationStatus.GENERATING_PROMPT ? t.calibrating : t.processing}
                    </p>
                </div>
            )}

            {status === GenerationStatus.COMPLETED && generatedImageUrl && (
                <div className="relative group shadow-2xl shadow-black">
                     <img 
                        src={generatedImageUrl} 
                        alt="Generated Poster" 
                        className="max-h-[80vh] w-auto object-contain rounded-sm border border-zinc-800"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                        <a 
                            href={generatedImageUrl} 
                            download="nano_banana_poster.png"
                            className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:scale-105 transition-transform"
                        >
                            {t.download}
                        </a>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default App;