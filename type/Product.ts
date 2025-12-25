export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  categoryId: {
    _id: string;
    name: string;
    slug: string;
  };
  colors?: string[];   // ✅ optional
  sizes?: string[];    // ✅ optional
  createdAt?: string;
  rating?: number;
  discount?: number;

}

