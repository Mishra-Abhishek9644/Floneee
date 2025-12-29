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

  colors?: string[];
  sizes?: string[];

  createdAt?: string;
  rating?: number;

  discount: number;     // ✅ REQUIRED
  finalPrice: number;   // ✅ REQUIRED
}
