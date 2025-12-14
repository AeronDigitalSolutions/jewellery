import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  categoryId: string;
  name: string;
  image: string;
  metalType: "Gold" | "Silver";
}

const categorySchema = new Schema<ICategory>(
  {
    categoryId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },

    // ✅ ADD THIS
    metalType: {
      type: String,
      enum: ["Gold", "Silver"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", categorySchema);
