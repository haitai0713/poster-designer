export interface OptionItem {
  value: string;
  label_en: string;
  label_zh: string;
}

export const STYLES: OptionItem[] = [
  { value: "Minimalism (Clean, Negative Space)", label_en: "Minimalism (Clean, Negative Space)", label_zh: "極簡主義 (乾淨，留白)" },
  { value: "Luxury (Gold, Silk, High-End)", label_en: "Luxury (Gold, Silk, High-End)", label_zh: "奢華風格 (金、絲綢、高級感)" },
  { value: "Cyberpunk (Neon, High-Tech, Grit)", label_en: "Cyberpunk (Neon, High-Tech, Grit)", label_zh: "賽博龐克 (霓虹、高科技)" },
  { value: "Bauhaus (Geometric, Primary Colors)", label_en: "Bauhaus (Geometric, Primary Colors)", label_zh: "包浩斯 (幾何、原色)" },
  { value: "Pop Art (Vibrant, Halftone, Comic)", label_en: "Pop Art (Vibrant, Halftone, Comic)", label_zh: "普普藝術 (鮮豔、網點、漫畫)" },
  { value: "Botanical (Organic, Nature Integration)", label_en: "Botanical (Organic, Nature Integration)", label_zh: "植物系 (有機、自然融合)" },
  { value: "Industrial (Concrete, Metal, Raw)", label_en: "Industrial (Concrete, Metal, Raw)", label_zh: "工業風 (水泥、金屬、原始)" },
  { value: "Vaporwave (Retro 80s, Pastel, Statues)", label_en: "Vaporwave (Retro 80s, Pastel, Statues)", label_zh: "蒸氣波 (復古80年代、粉彩)" },
  { value: "Surrealism (Dreamlike, Defying Physics)", label_en: "Surrealism (Dreamlike, Defying Physics)", label_zh: "超現實主義 (夢幻、反物理)" },
  { value: "Tech Noir (Cinematic, Shadowy, Moody)", label_en: "Tech Noir (Cinematic, Shadowy, Moody)", label_zh: "黑色科技 (電影感、陰影)" },
  { value: "Abstract Fluid (Liquid, Swirls, Motion)", label_en: "Abstract Fluid (Liquid, Swirls, Motion)", label_zh: "抽象流體 (液體、漩渦)" },
  { value: "Vintage 70s (Warm Grain, Retro Aesthetics)", label_en: "Vintage 70s (Warm Grain, Retro Aesthetics)", label_zh: "復古 70年代 (暖色顆粒)" }
];

export const LAYOUTS: OptionItem[] = [
  { value: "Hero Center (Classic Product Focus)", label_en: "Hero Center (Classic Product Focus)", label_zh: "英雄居中 (經典產品聚焦)" },
  { value: "Off-Center Right (Magazine/Editorial)", label_en: "Off-Center Right (Magazine/Editorial)", label_zh: "右側偏置 (雜誌/編輯風)" },
  { value: "Off-Center Left (Clean Typography Space)", label_en: "Off-Center Left (Clean Typography Space)", label_zh: "左側偏置 (留白文字空間)" },
  { value: "Diagonal Dynamic (Action Oriented)", label_en: "Diagonal Dynamic (Action Oriented)", label_zh: "動態對角線 (動作導向)" },
  { value: "Levitation (Zero Gravity, Floating)", label_en: "Levitation (Zero Gravity, Floating)", label_zh: "懸浮效果 (零重力)" },
  { value: "Macro Detail (Extreme Close-up)", label_en: "Macro Detail (Extreme Close-up)", label_zh: "微距細節 (極致特寫)" },
  { value: "Knolling (Top-Down, Organized Grid)", label_en: "Knolling (Top-Down, Organized Grid)", label_zh: "平鋪排列 (俯視、整齊網格)" },
  { value: "Framed Window (Looking Through Aperture)", label_en: "Framed Window (Looking Through Aperture)", label_zh: "框景視窗 (透過孔徑觀看)" },
  { value: "Symmetrical Reflection (Mirror Effect)", label_en: "Symmetrical Reflection (Mirror Effect)", label_zh: "對稱倒影 (鏡面效果)" },
  { value: "Overlapping Depth (Layered Elements)", label_en: "Overlapping Depth (Layered Elements)", label_zh: "層疊景深 (元素層次)" },
  { value: "Pattern Repetition (Product as Texture)", label_en: "Pattern Repetition (Product as Texture)", label_zh: "圖樣重複 (產品作為紋理)" },
  { value: "Rule of Thirds (Cinematic Balance)", label_en: "Rule of Thirds (Cinematic Balance)", label_zh: "三分法則 (電影平衡感)" }
];

export const ENVIRONMENTS: OptionItem[] = [
  { value: "Studio Softbox (Clean White/Grey)", label_en: "Studio Softbox (Clean White/Grey)", label_zh: "柔光攝影棚 (乾淨白/灰)" },
  { value: "Golden Hour (Warm Sunlight, Long Shadows)", label_en: "Golden Hour (Warm Sunlight, Long Shadows)", label_zh: "黃金時刻 (暖陽、長影)" },
  { value: "Neon City (Blue/Pink Street Lights)", label_en: "Neon City (Blue/Pink Street Lights)", label_zh: "霓虹城市 (藍/粉街燈)" },
  { value: "Volumetric Fog (Moody, God Rays)", label_en: "Volumetric Fog (Moody, God Rays)", label_zh: "體積霧氣 (耶穌光、氛圍)" },
  { value: "Tropical Jungle (Leaves, Dappled Light)", label_en: "Tropical Jungle (Leaves, Dappled Light)", label_zh: "熱帶叢林 (樹葉、光斑)" },
  { value: "Underwater (Caustics, Blue Tint, Bubbles)", label_en: "Underwater (Caustics, Blue Tint, Bubbles)", label_zh: "水下世界 (焦散、氣泡)" },
  { value: "Cosmic Space (Stars, Nebula, Dark)", label_en: "Cosmic Space (Stars, Nebula, Dark)", label_zh: "宇宙星空 (星塵、星雲)" },
  { value: "Liquid Splash (Water, Milk, Paint Interaction)", label_en: "Liquid Splash (Water, Milk, Paint Interaction)", label_zh: "液體飛濺 (水、牛奶、顏料)" },
  { value: "Concrete Brutalist (Harsh Shadows, Grey)", label_en: "Concrete Brutalist (Harsh Shadows, Grey)", label_zh: "清水模 (粗獷混凝土)" },
  { value: "Podium Stage (Spotlight, Velvet Texture)", label_en: "Podium Stage (Spotlight, Velvet Texture)", label_zh: "舞台展台 (聚光燈、絨布)" },
  { value: "Abstract Glass (Prisms, Refractions)", label_en: "Abstract Glass (Prisms, Refractions)", label_zh: "抽象玻璃 (稜鏡、折射)" },
  { value: "Arctic Ice (Cold, Blue, Crystalline)", label_en: "Arctic Ice (Cold, Blue, Crystalline)", label_zh: "極地冰原 (寒冷、結晶)" }
];