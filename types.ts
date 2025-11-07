export interface ProductVariant {
  id: string;
  name: string; // e.g., 'White, Short Sleeve'
  imageUrl: string;
  prompt: string;
  attributes: { [key: string]: string }; // e.g., { "color": "white", "sleeve": "short" }
}

export interface AttributeDefinition {
  key: string; // e.g., 'color'
  name: string; // e.g., 'Color'
}

export interface ProductCategory {
  id: string;
  name: string; // e.g., 'T-Shirt', 'Mug'
  variants: ProductVariant[];
  attributes: AttributeDefinition[];
}

export interface ImageFilters {
  brightness: number;
  contrast: number;
  saturation: number;
}

export interface TextOverlay {
  text: string;
  color: string;
  size: number;
}
