import mongoose, { Schema, models, Document, Types } from "mongoose";

/**
 * Wishlist Interface
 */
export interface IWishlist extends Document {
  userId: Types.ObjectId;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Wishlist Schema
 */
const WishlistSchema = new Schema<IWishlist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one wishlist per user
    },

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

/**
 * Prevent Next.js overwrite error
 */
const Wishlist =
  models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema);

export default Wishlist;
