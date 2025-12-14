import mongoose, { Schema, Document } from "mongoose";

export interface IMetal extends Document {
  name: string;
  price: number;
  perGram: number;
}

const metalSchema = new Schema<IMetal>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    perGram: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMetal>("Metal", metalSchema);
