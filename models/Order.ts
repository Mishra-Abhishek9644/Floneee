import mongoose, { Schema, models, Document, Types } from "mongoose";

/**
 * Order Item Interface
 */
interface IOrderItem {
  productId: Types.ObjectId;

  title: string;
  image: string;

  price: number;
  quantity: number;

  size: string;
  color: string;

  subtotal: number;
}

/**
 * Order Interface
 */
export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: "COD" | "ONLINE";
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Order Schema
 */
const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

        subtotal: { type: Number, required: true, min: 0 },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

/**
 * Prevent Next.js overwrite error
 */
const Order =
  models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
