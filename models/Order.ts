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

interface IBillingDetails {
  name: string;
  company: string;
  country: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  notes?: string;
}

interface IPaymentDetails {
  provider?: "RAZORPAY";
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  gatewaySignature?: string;
  paidAt?: Date;
}

/**
 * Order Interface
 */
export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  billingDetails?: IBillingDetails;
  totalAmount: number;
  paymentMethod: "COD" | "ONLINE";
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentDetails?: IPaymentDetails;
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

    billingDetails: {
      name: { type: String, trim: true },
      company: { type: String, trim: true },
      country: { type: String, trim: true },
      address1: { type: String, trim: true },
      address2: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zip: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true },
      notes: { type: String, trim: true },
    },

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

    paymentDetails: {
      provider: {
        type: String,
        enum: ["RAZORPAY"],
      },
      gatewayOrderId: { type: String, trim: true },
      gatewayPaymentId: { type: String, trim: true },
      gatewaySignature: { type: String, trim: true },
      paidAt: { type: Date },
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
