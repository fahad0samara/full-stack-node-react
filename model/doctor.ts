import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },

    lastName: {
      type: String,
      required: true,
    },
  },
  Hospital: {
    type: String,
    required: true,
  },
  HospitalAddress: {
    city: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    ZipCode: {
      type: String,
    },

    Country: {
      type: String,
      required: true,
    },
  },


  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },

});


const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
