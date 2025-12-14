import mongoose, { Schema, Document } from "mongoose";

export interface IFooter extends Document {
  address: string;
  phone: string;
  email: string;
}

const footerSchema = new Schema<IFooter>(
  {
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IFooter>("Footer", footerSchema);
