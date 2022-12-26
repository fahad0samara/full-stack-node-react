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

    role: {
      type: String,
      default: "Basic",
      required: true,
    },
    /* Creating a relationship between the user and the patient. */
    patient: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
        require:true
      },

    
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
