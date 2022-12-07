import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    doctorID: {
      type: Number,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    department: [{
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
      },
    }
    ],

    date: {
      type: Date,
      required: true,
    },
    medicines: [
      {
        name: {
          type: String,
          required: true,
        },

        type: {
          type: String,
          required: true,
        },
        frequency: {
          type: String,
          required: true,
        },
      },
    ],

    advice: {
      type: String,
      required: true,
    },

    dosage: {
      type: String,
      required: true,
    },

    nextVisit: {
      type: Date,
      required: true,
    },

    tests: {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  },
  {timestamps: true}
);



export default prescriptionSchema;
