import mongoose, { Schema, Document } from "mongoose";

export interface IPopupUser extends Document {
  name: string;
  email: string;
  phone: string;
}

const popupUserSchema = new Schema<IPopupUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPopupUser>("PopupUser", popupUserSchema);
