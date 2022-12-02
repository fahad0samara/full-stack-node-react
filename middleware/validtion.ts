import {string} from "joi";

const Joi = require("joi");
// register validation
const registerValidation = (data: any) => {
  const schema = Joi.object({
    healthID: Joi.string().min(8).required(),

    name: Joi.object({
      firstName: Joi.string().min(1).required(),
      middleName: Joi.string().min(1).required(),
      surName: Joi.string().min(1).required(),
    }),

    date: Joi.date().required(),

    bloodGroup: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
    mobile: Joi.string().min(1).max(10).required(),
    contactPerson: Joi.object({
      name: Joi.object({
        firstName: Joi.string().min(1).required(),
        surName: Joi.string().min(1).required(),
      }),
      mobile: Joi.string().min(1).max(10).required(),
      email: Joi.string().min(5).required().email(),
      address: [
        {
          building: Joi.string().min(1).required(),
          city: Joi.string().min(1).required(),
          taluk: Joi.string().min(1).required(),
          district: Joi.string().min(1).required(),
          state: Joi.string().min(1).required(),
          pinched: Joi.number().min(10).max(999999).required(),
        },
      ],
    }),
    address: [
      {
        building: Joi.string().min(3).required(),
        city: Joi.string().min(3).required(),
        taluk: Joi.string().min(3).required(),
        district: Joi.string().min(3).required(),
        state: Joi.string().min(3).required(),
        pinched: Joi.number().min(1).max(999999).required(),
      },
    ],
    // not allowed the same numbered
    NumberCard: Joi.number().min(7).max(999999999999).required(),
  });
  return schema.validate(data);
};
// login validation
const loginValidation = (data: any) => {
  const schema = Joi.object({
    password: Joi.string().min(5).required(),
    healthID: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

// addPrescriptions validation
const addPrescriptionsValidation = (data: any) => {
  const schema = Joi.object({
    patientID: Joi.number().min(8).required(),
    doctorID: Joi.number().min(5).required(),
    date: Joi.date().required(),
    medicines: Joi.object({
      name: Joi.string().min(1).required(),
      quantity: Joi.number().min(1).required(),
      dosage: Joi.string().min(1).required(),
      type: Joi.string().min(1).required(),
      duration: Joi.string().min(1).required(),
      frequency: Joi.string().min(1).required(),
      date: Joi.date().required(),
      total: Joi.number().min(1).required(),
    }),

    hospital: Joi.object({
      name: Joi.string().min(1).required(),
      address: Joi.string().min(1).required(),
      phone: Joi.string().min(1).required(),
    }),

    doctor: Joi.string().min(1).required(),

    tests: Joi.object({
      name: Joi.string().min(1).required(),
      date: Joi.date().required(),
    }),

    advice: Joi.string().min(1).required(),
    dosage: Joi.string().min(1).required(),
    nextVisit: Joi.number().min(1).max(999999).required(),
  });
  return schema.validate(data);
};

// doctor validation
const doctorValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.object({
      firstName: Joi.string().min(1).required(),
      middleName: Joi.string().min(1),
      lastName: Joi.string().min(1).required(),
    }),
    Hospital: Joi.string().min(1).required(),
    HospitalAddress: Joi.object({
      city: Joi.string().min(1).required(),
      building: Joi.string().min(1).required(),
      state: Joi.string().min(1).required(),
      ZipCode: Joi.number().min(1).max(999999).required(),
      Country: Joi.string().min(1).required(),
    }),
    email: Joi.string().min(5).required().email(),
    date: Joi.date().required(),

    password: Joi.string().min(5).required(),
    bloodGroup: Joi.string().required(),
    degree: Joi.string().min(1).required(),
    specialty: Joi.string().min(1).required(),
    experience:
      Joi.number().min(1).max(999999).required() &&
      Joi.number().min(1).max(999999).required(),
    phoneNumber: Joi.number().min(6).required(),
  });
  return schema.validate(data);
};

 //  loginDoctor validation
const loginDoctorValidation = (data: any) => {
  const schema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string().min(5).required().email(),
  });
  return schema.validate(data);
};



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addPrescriptionsValidation = addPrescriptionsValidation;
module.exports.doctorValidation = doctorValidation;
module.exports.loginDoctorValidation = loginDoctorValidation;
