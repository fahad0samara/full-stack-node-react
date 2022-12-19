import { boolean } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    roles: {
      patient: {
        type: Number,
        default: 0

      },
      doctor: {
        type: Number,
        default: 5
      },
      admin: {
        type: Number,
        default: 6
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
