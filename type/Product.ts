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
  colors?: string[] | string; 
  sizes?: string[] | string;  
  createdAt?: string;
  rating?: number;
  discount?: number;

}

