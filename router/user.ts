import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";
const {
  registerUserValidation,
  loginUserValidation,
  registerValidation,
  loginValidation,
} = require("../middleware/validtion");

import {
  authAdmin,
  authPatient,
  isAdmin,
  isAuth,
} from "../middleware/jwtPatient";
import Patient from "../model/patient";
import Doctor from "../model/doctor";

interface JwtPayload {
  _id: string;
  role: string;
  doctorId?: string; // add this line
}

// loginUser
router.post(
  "/loginUser",

  async (req, res) => {
    // validate the data before we make a user
    const {error} = loginUserValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the user is already in the database
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return res.status(400).send("Email is not found");

    try {
      // check if the password is correct
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send("Invalid password");

      // Check if the user is a doctor
      if (user.role === "doctor") {
        // Find the corresponding doctor in the Doctor collection
        const doctor = await Doctor.findOne({
          user: user._id,
        });
        if (!doctor) return res.status(400).send("Doctor not found");

        // Create and assign a token and roles
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
            doctorId: doctor._id,
          },
          process.env.JWT_SECRET as string
        );
        res
          .header("auth-token", token)

          .json({
            token,
            user,
            doctor,
          });
      } else if (user.role === "patient") {
        // Find the corresponding patient in the Patient collection
        const patient = await Patient.findOne({
          user: user._id,
        });

        if (!patient) return res.status(400).send("Patient not found");

        // Create and assign a token and roles
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
            patientId: patient._id,
          },
          process.env.JWT_SECRET as string
        );

        res

          .header("auth-token", token)

          .json({
            token,
            user,
            patient,
          });
      } else if (user.role === "admin") {
        // Create and assign a token and roles
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET as string
        );
        res
          .header("auth-token", token)

          .json({
            token,
            user,
          });
      }
    } catch (error) {
      console.log(error);
      
      
      res.status(400).json({
        message: (error as Error).message,
        error,
      });
    }
  }
);

// get the user

router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await Patient.findById(req.params.id).populate("patientId");
    res.json(user);
  } catch (error) {
    res.json({message: (error as Error).message});
  }
});

router.get(
  "/profile",
  isAuth,

  async (req: any, res: any) => {
    if (!req.user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User found",
      user: req.user,
    });
  }
);

router.get("/patient", async (req, res) => {
  try {
    const patient = await Patient.find().populate("user");
    res.json(patient);
  } catch (error) {
    res.json({message: (error as Error).message});
  }
});

router.get(
  "/userpatients",
  authPatient,

  async (req: any, res: any) => {
    if (!req.user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User found",
      user: req.user,
    });
  }
);

router.get("/patient/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("user");
    res.json(patient);
  } catch (error) {
    res.json({message: (error as Error).message});
  }
});

router.post("/register-user", async (req: any, res: any) => {
  // Check if the user is an admin

  // check if the user is already in the database
  const emailFind = await User.findOne({
    email: req.body.email,
  });
  if (emailFind) return res.status(400).send("Email already exists");

  // destructure the request body
  const {email, password, role} = req.body;

  // hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  // create a new user with the specified role
  try {
    const user = new User({
      email,
      password: hashPassword,
      role,
    });
    await user.save();
    res.json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/register-patient", async (req, res) => {
  // validate the data before we make a patient
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the User is already in the database
  const Userfind = await User.findById(req.body.user);
  if (!Userfind) return res.status(400).send("User not found");

  // check if the User the role is patient
  if (Userfind.role !== "patient")
    return res.status(400).send("User not patient");

  // check if the patient is already in the database
  const userExist = await Patient.findOne({
    user: req.body.user,
  });
  if (userExist) return res.status(400).send("User already exists");
  // create  healthID id for user start from 10
  const healthIDNumber = (await Patient.countDocuments()) + 10;
  // create a new patient

  try {
    const patient = new Patient({
      user: req.body.user,
      prescriptions: req.body.prescriptions,
      healthIDNumber: healthIDNumber,
      name: req.body.name,
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
      weight: req.body.weight,
      height: req.body.height,
    });

    const newPatient = await patient.save();
    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      newPatient,
    });
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

export default router;
