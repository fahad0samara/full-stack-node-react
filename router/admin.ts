import express from "express";
const router = express.Router();

import Admin from "../model/admin";
import Doctor from "../model/doctor";
import Patient from "../model/patient";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {authAdmin} from "../middleware/jwtPatient";
const {
  adminValidation,
  loginAdminValidation,
} = require("../middleware/validtion");

// registerAdmin
router.post("/registerAdmin", async (req, res) => {
  // validate the data before we make a admin
  const {error} = adminValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the admin is already in the database
  const emailExist = await Admin.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).send("Email already exists");

  // hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create a new admin
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
  });
  try {
    const savedAdmin = await admin.save();
    res.send({
      savedAdmin,
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});

// loginAdmin
router.post("/loginAdmin",

  async (req, res) => {
  // validate the data before we make a admin
  const {error} = loginAdminValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the admin is already in the database
  const admin = await Admin.findOne({
    email: req.body.email,
  });
  if (!admin) return res.status(400).send("Email is not found");

  // check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send("Invalid password");
  // create and assign a token
  const token = jwt.sign({_id: admin._id}, process.env.JWT_SECRET as string);
  res.header("auth-token", token);

  res.json({
    token,
    admin,
  });
});

// getAllAdmin
router.get("/getAllAdmin", authAdmin, async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});

// getAllDoctor
router.get("/getAllDoctor", authAdmin, async (req, res) => {
  try {
    const doctor = await Doctor.find();
    res.json(doctor);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});

// getAllPatient
router.get("/getAllPatient", authAdmin, async (req, res) => {
  try {
    const patient = await Patient.find();
    res.json(patient);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});

// delete doctor
router.delete("/deleteDoctor/:id", authAdmin, async (req, res) => {
  // checking if the id is correct in the database or not
  const doctor = await Doctor.findById({
    _id: req.params.id,
  });
  if (!doctor) return res.status(400).send("Doctor s is not found");

  try {
    /* Checking if the doctor is in the database or not. */
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(400).send("Doctor is not found");

    /* Deleting the doctor from the database. */

    const removedDoctor = await Doctor.findByIdAndDelete({_id: req.params.id});
    res.json(`Doctor with id ${req.params.id}has been deleted successfully.`);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});

// delete patient
router.delete("/deletePatient/:healthID", async (req, res) => {
  /* Checking if the patient is in the database or not. */
  const patient = await Patient.findOne({
    healthID: req.params.healthID,
  });
  if (!patient) return res.status(400).send("Patient is not found");

  try {
    const patient = await Patient.findOneAndDelete({
      healthID: req.params.healthID,
    });

    res.json(
      `Patient with healthID ${req.params.healthID} has been deleted successfully`
    );
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});

export default router;
