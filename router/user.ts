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

// registerUser
router.post(
  "/registerUser",

  async (req, res) => {
    // validate the data before we make a user
    const {error} = registerUserValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the user is already in the database
    const emailExist = await User.findOne({
      email: req.body.email,
    });
    if (emailExist) return res.status(400).send("Email already exists");

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new User({
      email: req.body.email,
      password: hashedPassword,

      role: req.body.role,
    });
    try {
      const savedUser = await user.save();
      res.json({
        success: true,
        message: "User created successfully",
        user: savedUser,
        // id for the user
        id: savedUser._id,
      });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
        error,
      });
    }
  }
);

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

      // Create and assign a token and roles
      const token = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },

        // @ts-ignore

        process.env.JWT_SECRET as string
      );
      res
        .header("auth-token", token)

        .json({
          token,
          user,
        });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
        error,
      });
    }
  }
);

// delete user
router.delete(
  "/deleteUser/:id",

  isAdmin,

  async (req, res) => {
    try {
      const removedUser = await User.remove({_id: req.params.id});
      res.json(removedUser);
    } catch (error) {
      res.json({message: (error as Error).message});
    }
  }
);

// chang the role admin and user and
router.put("/changeRole/:id", isAdmin, async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      {_id: req.params.id},
      {
        $set: {
          role: req.body.role,
        },
      }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({message: (error as Error).message});
  }
});

//update the role
router.put(
  "/updateRole",

  async (req, res) => {
    const {role, id} = req.body;
    // First - Verifying if role and id is presnt
    if (role && id) {
      // Second - Verifying if the value of role is admin
      if (role === "admin") {
        // Finds the user with the id
        await User.findById(id)
          .then(
            (
              user // If the user is found
            ) => {
              if (user) {
                // If the user is an admin
                if (user.role === "admin") {
                  // Return a message
                  res.status(400).json({
                    message: "User is already an admin",
                  });
                } else {
                  // If the user is not an admin
                  // Update the role to admin
                  User.findByIdAndUpdate(id, {
                    role: "admin",
                  })
                    .then(() => {
                      // Return a message
                      res.status(200).json({
                        message: "User role updated to admin",
                      });
                    })
                    .catch(error => {
                      // If there is an error
                      // Return a message
                      res.status(400).json({
                        message: (error as Error).message,
                      });
                    });
                }
              } else {
                // If the user is not found
                // Return a message
                res.status(400).json({
                  message: "User not found",
                });
              }
            }
          )
          .catch(error => {
            // If there is an error
            // Return a message
            res.status(400).json({
              message: (error as Error).message,
            });
          });
      } else {
        // If the value of role is not admin
        // Return a message
        res.status(400).json({
          message: "Role must be admin",
        });
      }
    } else {
      // If role and id is not present
      // Return a message
      res.status(400).json({
        message: "Role and id must be present",
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

router.post("/patient", async (req, res) => {
  // validate the data before we make a user
  const {error} = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    // check if the user by id is already in the database
    const user = await User.findById(req.body.user);
    if (!user) return res.status(400).send("User is not found");
    // dont allond to user to post 2 time
    const patient2 = await Patient.findOne({
      user: req.body.user,
    });
    if (patient2) return res.status(400).send("Patient is already exist");

    //  update the user
    const patient = new Patient({
      user: req.body.user,
      mobile: req.body.mobile,

      name: req.body.name,
      relation: req.body.relation,
      address: req.body.address,
      date: req.body.date,
      medicationList: req.body.medicationList,
      diseaseList: req.body.diseaseList,
      allergyList: req.body.allergyList,
      bloodGroup: req.body.bloodGroup,
      contactPerson: req.body.contactPerson,
    });

    const savedPatient = await (await patient.save()).populate("user");
    // Create and assign a token
    const token = jwt.sign(
      {_id: patient._id},
      process.env.JWT_SECRET as string
    );
    res.header("auth-token", token);

    console.log(user);

    res.json({
      success: true,
      message: "Patient registered successfully",
      user: savedPatient,
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      success: false,
      err,
    });
  }
});

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
  const healthIDNumber = await Patient.countDocuments() + 10;
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
