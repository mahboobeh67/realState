export type ProfileCategory = "villa" | "apartment" | "store" | "office";

export interface Profile {
  _id: string;
  title: string;
  category: ProfileCategory;
  price: number;
  location: string;

  description?: string;
  phone?: string;
  realState?: string;
  constructionDate?: string | Date;
  amenities?: string[];
  rules?: string[];
  userId?: string;
}
