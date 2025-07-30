import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  dob: string;
  otp?: string;
  password?: string;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: String, required: true },
  otp: { type: String },
  password: { type: String }, // optional if using Google Auth only
});

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
