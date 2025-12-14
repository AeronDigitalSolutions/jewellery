import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  image: string;
  createdAt: Date;
}

const bannerSchema = new Schema<IBanner>(
  {
    image: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBanner>("Banner", bannerSchema);
