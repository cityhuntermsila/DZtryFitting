export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  STYLE_STUDIO = 'STYLE_STUDIO',
  MY_LOOKS = 'MY_LOOKS',
  SUBSCRIPTION = 'SUBSCRIPTION',
  FAQ = 'FAQ',
  HOW_TO_USE = 'HOW_TO_USE',
  CONTACT = 'CONTACT',
  ABOUT_US = 'ABOUT_US',
  PARTNERS = 'PARTNERS'
}

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
  NON_BINARY = 'Non-Binary'
}

export enum BodyShape {
  SLIM = 'Slim',
  ATHLETIC = 'Athletic',
  CURVY = 'Curvy',
  PLUS_SIZE = 'Plus Size'
}

export enum SkinTone {
  LIGHT = 'Light',
  MEDIUM = 'Medium',
  DARK = 'Dark'
}

export enum PoseType {
  FRONT = 'Front View',
  SIDE = 'Side Profile',
  THREE_QUARTER = '3/4 View',
  WALKING = 'Walking',
  ACTION = 'Action/Jump'
}

export interface VirtualModel {
  id: string;
  name: string;
  gender: Gender;
  bodyShape: BodyShape;
  skinTone: SkinTone;
  previewUrl: string; 
}

export interface GeneratedLook {
  id: string;
  imageUrl: string;
  createdAt: Date;
  modelName: string;
  garmentName: string;
  garmentImageUrl?: string; // Added field for garment thumbnail
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export type GarmentCategory = 'Tops' | 'Bottoms' | 'Dresses' | 'Traditional';

export interface PredefinedGarment {
  id: string;
  name: string;
  category: GarmentCategory;
  description: string;
  image: string; // Placeholder URL
  availableColors: string[];
}

export interface GarmentDetails {
  name: string;
  description: string;
  imageUrl: string;
  color: string;
}