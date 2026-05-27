import { extrait50Batch8Products } from './products-extrait50-batch8';
import { extrait50Batch9Products } from './products-extrait50-batch9';
import { extrait50Batch10Products } from './products-extrait50-batch10';
import { extrait50Batch11Products } from './products-extrait50-batch11';

export type FragranceFamily = 'Fresh' | 'Woody' | 'Oriental' | 'Floral' | 'Gourmand' | 'Leather' | 'Amber' | 'Smoky';

export type ProductCategory = 'MEN' | 'WOMEN' | 'UNISEX' | 'BUNDLES';

export type MoodLabel = 'Fresh' | 'Woody' | 'Oriental' | 'Floral' | 'Gourmand' | 'Leather' | 'Amber' | 'Smoky' | 'Office' | 'Date Night' | 'Beast Mode' | 'Signature' | 'Romantic' | 'Confident';

export type Occasion = 'Day Wear' | 'Evening Wear' | 'Office Wear' | 'Date Night' | 'Special Event' | 'Casual' | 'Signature Daily';

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'All Year';

export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface CompareSection {
  inspirationName: string;
  designer: string;
  retailPrice: number;
  inspirationImg: string;
  keyDifferences: string;
  ourApproach: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  sub: string;
  price: number;
  originalPrice: number | null;
  tag: string;
  tagColor: string;
  bg: string;
  accentColor: string;
  category: ProductCategory;
  fragranceFamily?: FragranceFamily;
  note?: string;
  weight: string;
  concentration?: string;
  longevity?: string;
  projection?: string;
  rating: number;
  reviews: number;
  img: string;
  heroImg: string;
  moodLabels?: MoodLabel[];
  scentNotes?: ScentNotes;
  occasion?: Occasion;
  season?: Season;
  ingredients: string[];
  benefits: string[];
  scentDescription?: string;
  packagingDescription?: string;
  description: string;
  sizes: { label: string; price: number }[];
  inspiredBy: { name: string; designer: string; price: number; img: string };
  compareSection?: CompareSection;
}

export const allProducts: Product[] = [
  ...extrait50Batch8Products,
  ...extrait50Batch9Products,
  ...extrait50Batch10Products,
  ...extrait50Batch11Products,
];