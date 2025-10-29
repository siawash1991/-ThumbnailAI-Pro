
export interface ImageFile {
  file: File;
  preview: string;
}

export interface StyleTemplate {
  style_id: string;
  name: string;
  category: string;
  preview_image_url: string;
  ai_prompt_template: string;
}
