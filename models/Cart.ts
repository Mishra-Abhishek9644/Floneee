import mongoose, { Schema, models, Document, Types } from "mongoose";

interface ICartItem {
  productId: Types.ObjectId;

  title: string;
  image: string;

  price: number;
  quantity: number;

  size: string;
  color: string;

  stock: number;
  subtotal: number;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        title: { type: String, required: true },
        image: { type: String, required: true },

        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },

        size: { type: String, required: true },
        color: { type: String, required: true },

        stock: { type: Number, required: true, min: 0 },
        subtotal: { type: Number, required: true, min: 0 },
      },
    ],
  },
  { timestamps: true }
);

const Cart = models.Cart || mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
