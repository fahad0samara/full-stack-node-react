import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Doctor from "../model/doctor";

import Patient from "../model/patient";
const {
  doctorValidation,
  loginDoctorValidation,
  addPrescriptionsValidation,
} = require("../middleware/validtion");

// registerDoctor
router.post("/registerDoctor",  async (req, res) => {
  // validate the data before we make a doctor
  const {error} = doctorValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the doctor is already in the database
  const emailExist = await Doctor.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).send("Email already exists");

  // hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create a new doctor
  const doctor = new Doctor({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    Hospital: req.body.Hospital,
    HospitalAddress: req.body.HospitalAddress,
    date: req.body.date,
    bloodGroup: req.body.bloodGroup,
    degree: req.body.degree,
    specialty: req.body.specialty,
    phoneNumber: req.body.phoneNumber,
    experience: req.body.experience,
  });
  try {
    const savedDoctor = await doctor.save();
    res.send({
      savedDoctor,
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});

// loginDoctor
router.post("/loginDoctor", async (req, res) => {
  // validate the data before we make a doctor
  const {error} = loginDoctorValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the doctor is already in the database
  try {
    const doctor = await Doctor.findOne({
      email: req.body.email,
    });
    if (!doctor) return res.status(400).send("Email is not found");

    // check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, doctor.password);
    if (!validPass) return res.status(400).send("Invalid password");

    // create and assign a token
    const token = jwt.sign({_id: doctor._id}, process.env.JWT_SECRET as string);
    res.header("auth-token", token);

    res.json({
      token,
      doctor,
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});

router.post("/addPrescriptions/:id", async (req, res) => {
  // validate the data before we make a user
  const {error} = addPrescriptionsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
    });
    if (!patient) return res.status(400).send("Patient not found");

    const prescriptions = {
      doctorID: req.body.doctorID,
      medicines: req.body.medicines,
      department: req.body.department,
      date: req.body.date,
      doctor: req.body.doctor,
      advice: req.body.advice,
      dosage: req.body.dosage,
      nextVisit: req.body.nextVisit,
      tests: req.body.tests,
    };
    patient.prescriptions.push(prescriptions);
    const savedPatient = await patient.save();
    res.send({
      savedPatient,
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
});

router.get("/getPrescriptions/:id", async (req, res) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
    });
    if (!patient) return res.status(400).send("Patient not found");

    res.send({
      patient,
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
});

router.get("/getPatients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.send({
      patients,
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
});

router.get("/getPatient/:id", async (req, res) => {
  try {
    const patient = await Patient.findOne({
      id: req.params.id,
    });
    if (!patient) return res.status(400).send("Patient not found");

    res.send({
      patient,
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
});

router.get("/getPatientForDoctor/:id", async (req, res) => {
  try {


    const patient = await Patient.find({
      prescriptions: {
        $elemMatch: {
          doctorID: req.params.id,
        },
      },
    });
    if (!patient) return res.status(400).send("Patient not found");

    res.send({
      patient,
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
});

export default router;
