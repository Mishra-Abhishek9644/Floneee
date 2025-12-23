import mongoose, { Schema, models, Document, Types } from "mongoose";

/**
 * Product Interface (TypeScript)
 * Used for type-safety in code
 */
export interface IProduct extends Document {
  title: string;
  price: number;
  image: string;
  description: string;
  categoryId: Types.ObjectId;
  stock: number;
   sizes: string[];     
  colors: string[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Product Schema (MongoDB)
 */
const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    sizes: {
      type: [String],
      default: [],
    },

    colors: {
      type: [String],
      default: [],
    },


    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

/**
 * Prevent model overwrite error in Next.js
 */
const Product = models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
