import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  patientID: {
    type: Number,
    required: true,
    min: 8,
  },
  doctorID: {
    type: Number,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  hospital: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },

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

      dose: {
        morning: {
          type: String,
        },
        afternoon: {
          type: String,
        },
        medic: {
          type: String,
        },
      },

      type: {
        type: String,
        required: true,
      },
      frequency: {
        type: String,
        required: true,
      },
      total: {
        type: Number,
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
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
