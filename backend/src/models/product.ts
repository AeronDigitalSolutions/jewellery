import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  productId: string;
  name: string;

  category: mongoose.Types.ObjectId; // ✅ ObjectId

  metalId: string;
  metalPrice: number;
  weight: number;

  wastageType: "PERCENT" | "AMOUNT";
  wastageValue: number;

  makingType: "PERCENT" | "AMOUNT";
  makingValue: number;

  totalPrice: number;

  description?: string;
  specification?: string;
  images: string[];
}

const productSchema = new Schema<IProduct>(
  {
    productId: { type: String, required: true, unique: true },

    name: { type: String, required: true },

    // ✅ OBJECT ID RELATION
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    metalId: { type: String, required: true },
    metalPrice: { type: Number, required: true },
    weight: { type: Number, required: true },

    wastageType: {
      type: String,
      enum: ["PERCENT", "AMOUNT"],
      default: "PERCENT",
    },
    wastageValue: { type: Number, default: 0 },

    makingType: {
      type: String,
      enum: ["PERCENT", "AMOUNT"],
      default: "PERCENT",
    },
    makingValue: { type: Number, default: 0 },

    totalPrice: { type: Number, required: true },

    description: String,
    specification: String,
    images: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
