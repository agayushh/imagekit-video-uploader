import mongoose, { Schema, model, models, InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10); //override kardo ye value ko
  next();
});

type UserType = InferSchemaType<typeof userSchema>;

const User = models?.User || model<UserType>("User", userSchema);

export default User;
