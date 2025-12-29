import { Language } from "./types";

export const TEXT = {
  en: {
    appTitle: "Poster Designer",
    appSubtitle: "AI COMMERCIAL STUDIO",
    apiKeyMissing: "To use image generation, you must select a valid API key.",
    selectKeyBtn: "Select API Key",
    billingDoc: "Billing Documentation",
    
    // Form Labels
    uploadLabel: "Product Sample (Required for Analysis)",
    descLabel: "Additional Description (Optional)",
    descPlaceholder: "e.g. Matte black wireless headphones... (Leave blank if image provided)",
    styleLabel: "Visual Style",
    layoutLabel: "Composition Layout",
    envLabel: "Lighting & Environment",
    textLabel: "Text Overlay",
    textPlaceholder: "e.g. SOUND REDEFINED",
    selectOption: "Select an option...",

    // Status
    btnAnalyze: "Analyzing Strategy...",
    btnRender: "Rendering Image...",
    btnGenerate: "Generate Poster",
    btnRegenerate: "Regenerate",
    btnRetry: "Retry",
    
    // Uploader
    clickToUpload: "Click to upload",
    productImage: "product image",
    autoDetect: "AI will auto-detect subject",
    analyzing: "Analyzing Subject...",
    
    // Preview
    waiting: "Waiting for input",
    calibrating: "Calibrating...",
    processing: "Processing Pixels...",
    generatedInstruction: "Generated Instruction",
    systemReady: "SYSTEM_READY",
    download: "Download Asset",

    // Errors
    errorMissingInput: "Please upload a product image OR description, and provide text overlay.",
    errorKeyInvalid: "API Key invalid or not found. Please select a key again.",
    errorGeneric: "Failed to generate content. Please try again."
  },
  zh: {
    appTitle: "海報設計師",
    appSubtitle: "AI 商業攝影棚",
    apiKeyMissing: "若要生成圖像，必須選擇有效的 API 金鑰。",
    selectKeyBtn: "選擇 API 金鑰",
    billingDoc: "計費文件",

    // Form Labels
    uploadLabel: "產品範例圖 (AI 分析必須)",
    descLabel: "補充描述 (選填)",
    descPlaceholder: "例如：消光黑無線耳機... (若有圖片可留空)",
    styleLabel: "視覺風格",
    layoutLabel: "構圖佈局",
    envLabel: "光影與環境",
    textLabel: "海報標題文字",
    textPlaceholder: "例如：重新定義聲音",
    selectOption: "請選擇一個選項...",

    // Status
    btnAnalyze: "正在分析策略...",
    btnRender: "正在渲染圖像...",
    btnGenerate: "生成海報",
    btnRegenerate: "重新生成",
    btnRetry: "重試",

    // Uploader
    clickToUpload: "點擊上傳",
    productImage: "產品圖片",
    autoDetect: "AI 將自動偵測主體",
    analyzing: "正在分析主體...",

    // Preview
    waiting: "等待輸入",
    calibrating: "校準中...",
    processing: "像素處理中...",
    generatedInstruction: "生成的 AI 指令",
    systemReady: "系統就緒",
    download: "下載素材",

    // Errors
    errorMissingInput: "請上傳產品圖片或提供描述，並輸入海報文字。",
    errorKeyInvalid: "API 金鑰無效或未找到。請重新選擇金鑰。",
    errorGeneric: "生成內容失敗，請重試。"
  }
};

export const getTexts = (lang: Language) => {
  return lang === 'en' ? TEXT.en : TEXT.zh;
};