
import { StyleTemplate } from './types';

export const STYLE_TEMPLATES: StyleTemplate[] = [
  {
    style_id: 'tech_neon_gaming',
    name: 'Neon Gaming',
    category: 'Tech & Gaming',
    preview_image_url: 'https://picsum.photos/seed/neongaming/200/112',
    ai_prompt_template: `Create a vibrant gaming YouTube thumbnail with a neon aesthetic. Use a color palette of #00FF9F, #FF00FF, #00D9FF. The main subject should be prominent with a glowing effect. The text should be bold, using a font like 'Bebas Neue', with a neon glow shadow and a slight stroke for maximum readability. The background should be a dark, abstract gradient with particle effects. The composition should be dynamic and high-energy.`
  },
  {
    style_id: 'lifestyle_bright_cheerful',
    name: 'Bright & Cheerful',
    category: 'Lifestyle & Vlog',
    preview_image_url: 'https://picsum.photos/seed/lifestyle/200/112',
    ai_prompt_template: `Create a bright, cheerful, and airy YouTube thumbnail for a lifestyle vlog. Use a light and pastel color palette. The main subject should have a friendly, emotional facial expression. Text should be a clean, friendly script or sans-serif font like 'Poppins'. The overall composition should feel clean, open, and positive with soft lighting and high contrast for mobile visibility.`
  },
  {
    style_id: 'edu_clean_professional',
    name: 'Clean Professional',
    category: 'Educational',
    preview_image_url: 'https://picsum.photos/seed/education/200/112',
    ai_prompt_template: `Create a clean and professional YouTube thumbnail for an educational video. Use a corporate color palette, such as blues, grays, and whites. The layout must be structured with a clear visual hierarchy. The main subject, if present, should look professional. Text should be a highly readable sans-serif font like 'Inter' or 'Roboto', clearly stating the topic. Additional elements could be clean icons or infographics. The background should be simple and non-distracting.`
  },
  {
    style_id: 'biz_corporate',
    name: 'Corporate',
    category: 'Business & Finance',
    preview_image_url: 'https://picsum.photos/seed/business/200/112',
    ai_prompt_template: `Generate a corporate business YouTube thumbnail. The style should be minimalist and professional, using a palette of blues, whites, and a single accent color like gold or green. The composition should be balanced and organized. Text must be sharp, using a font like 'Lato' or 'Montserrat', clearly conveying a business or finance topic. Any additional graphic elements should be clean lines or simple shapes.`
  },
  {
    style_id: 'ent_drama_reaction',
    name: 'Drama & Reaction',
    category: 'Entertainment',
    preview_image_url: 'https://picsum.photos/seed/drama/200/112',
    ai_prompt_template: `Create a high-impact, dramatic YouTube thumbnail for a reaction or entertainment video. Use bold, saturated colors with high contrast. The main subject's face must show a very strong, exaggerated emotion (shock, laughter, etc.). Use large, attention-grabbing text with heavy strokes or shadows. The composition can include arrows, circles, or other elements to draw attention to specific parts of the image.`
  },
  {
    style_id: 'food_recipe',
    name: 'Recipe Card',
    category: 'Food & Cooking',
    preview_image_url: 'https://picsum.photos/seed/food/200/112',
    ai_prompt_template: `Design a delicious-looking YouTube thumbnail for a cooking or recipe video. The main subject should be a beautifully shot photo of the finished dish. Use warm and inviting colors. The text should look like it's part of a recipe card, using elegant script and serif fonts. The background should be a clean kitchen or rustic table setting. The overall mood should be appetizing and high-quality.`
  }
];
