import mongoose, { Schema, Document } from "mongoose";

export interface ITopProduct extends Document {
  slot: number;
  productId: mongoose.Types.ObjectId;
}

const topProductSchema = new Schema<ITopProduct>(
  {
    slot: { type: Number, required: true, unique: true },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITopProduct>(
  "TopProduct",
  topProductSchema
);
