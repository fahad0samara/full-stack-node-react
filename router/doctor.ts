import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Doctor from "../model/doctor";
const {
  doctorValidation,
  loginDoctorValidation,
} = require("../middleware/validtion");

// registerDoctor
router.post("/registerDoctor", async (req, res) => {
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

router.get("/");

export default router;
