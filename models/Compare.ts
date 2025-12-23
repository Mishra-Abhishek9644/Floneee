import mongoose, { Schema, models, Document, Types } from "mongoose";

/**
 * Compare Interface
 */
export interface ICompare extends Document {
  userId: Types.ObjectId;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Compare Schema
 */
const CompareSchema = new Schema<ICompare>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one compare list per user
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
const Compare =
  models.Compare || mongoose.model<ICompare>("Compare", CompareSchema);

export default Compare;
