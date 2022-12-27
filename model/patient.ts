
import mongoose from "mongoose";
import prescriptionSchema from "./prescription";




//bcrypt

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose
  .connect(
    // @ts-ignore
    process.env.Patient_URI,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err: any) => console.log(err, "error mongodeb"));
// const prescriptionSchema = require("./prescription");

const patientSchema = new mongoose.Schema({
  healthIDNumber: {
    type: Number,
  },

  /* A reference to the User model. */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
  },

  bloodGroup: {
    type: String,
    required: true,
  },
  address: {
    building: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    Street: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    ZipCode: {
      type: Number,

      required: true,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  diseaseList: [
    {
      disease: {
        type: String,
      },
      YearRound: {
        type: Number,
      },
    },
  ],

  allergyList: [
    {
      allergy: {
        type: String,
      },
      YearRound: {
        type: Number,
      },
    },
  ],
  medicationList: [
    {
      medication: {
        type: String,
      },
      YearRound: {
        type: Number,
      },
    },
  ],
  contactPerson: {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      LastName: {
        type: String,
        required: true,
      },
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    relation: {
      type: String,
      required: true,
    },
    age: {
      type: Date,
      required: true,
    },

    address: {
      building: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      Street: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      ZipCode: {
        type: Number,
        required: true,
      },
    },
  },

  prescriptions: [prescriptionSchema],
});



const Patient = mongoose.model("patient", patientSchema);

export default Patient;
