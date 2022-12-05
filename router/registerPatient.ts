import express from "express";
const router = express.Router();
import Patient from "../model/patient";
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validtion");
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

router.post("/registerPatient", async (req, res) => {
  // validate the data before we make a user
  const {error} = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const emailExist = await Patient.findOne({
      email: req.body.email,
    });
    if (emailExist) return res.status(400).send("Email already exists");
    // check if the healthID is already in
    

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const patient = new Patient({
      name: req.body.name,
    
      password: hashedPassword,
      mobile: req.body.mobile,
      email: req.body.email,
      relation: req.body.relation,
      address: req.body.address,
      date: req.body.date,
      medicationList: req.body.medicationList,
      diseaseList: req.body.diseaseList,
      allergyList: req.body.allergyList,
      
      bloodGroup: req.body.bloodGroup,
      contactPerson: req.body.contactPerson,
    });
    const savedPatient = await patient.save();
    res.send({
      savedPatient,
    });
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message,
      err,
    });
  }
});

// log in
router.post("/loginPatient", async (req, res) => {
  // validate the data before we make a user
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // check if the healthID exists
    const patient = await Patient.findOne({
      healthID: req.body.healthID,
    });
    if (!patient) return res.status(400).send("Health ID is not found");

    // check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, patient.password);
    if (!validPass) return res.status(400).send("Invalid password");

    // create and assign a token
    const token = jwt.sign(
      {
        _id: patient._id,
      },
      process.env.JWT_SECRET as string
    );
    res.header("auth-token", token);

    res.send({
      patient,
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message,
      err,
    });
  }
});

export default router;
