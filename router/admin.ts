import express from "express";
const router = express.Router();

import Doctor from "../model/doctor";
import Patient from "../model/patient";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";

const {
  doctorValidation,
  adminValidation,
  loginAdminValidation,
  registerUserValidation,

  addPrescriptionsValidation,
} = require("../middleware/validtion");

// registerAdmin



interface JwtPayload {
  _id: string;
}
// Middleware to check if user is an admin

const checkAdmin =async (req: any, res: any, next: any) => {
  if (req.header && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const user = await User.findById((decoded as JwtPayload)._id);
      if (!user) {
        return res.status(400).send("user not found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(400).send("Invalid Token 2");
    }
  } else {
    res.status(400).send("Invalid Token");
  }
};

// Get a list of all admin  
router.get("/admins", checkAdmin, (req, res) => {
  User.find({ role: "admin" })
    .then(admins => res.json(admins))
    .catch(err => res.status(400).json(err));
});

// Delete an admin from the database
router.delete("/admin/:id", checkAdmin, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(admin => res.json(admin))
    .catch(err => res.status(400).json(err));
});





    


  



// Get a list of all doctors
router.get("/doctors", checkAdmin, (req, res) => {
  Doctor.find()
    .populate("user")
    .then(doctors => res.json(doctors))
    .catch(err => res.status(400).json(err));
});



// Update a doctor's information
router.put("/doctor/:id", checkAdmin, (req, res) => {
  Doctor.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(doctor => res.json(doctor))
    .catch(err => res.status(400).json(err));
});

// Get a list of all patients
router.get("/patients", checkAdmin, (req, res) => {
  Patient.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json(err));
});

// Delete a patient from the database
router.delete("/patient/:id", checkAdmin, (req, res) => {
  Patient.findByIdAndDelete(req.params.id)
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json(err));
});













router.post("/update", async (req, res) => {
  try {
    // Find the user to be updated
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(404).send("User not found");

    // Update the user's role to "Admin"
    user.role = "admin";
    await user.save();

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});









// Router for an administrator to register a new user with any role:

router.post("/register-user", async (req: any, res: any) => {
  // Check if the user is an admin

  // check if the user is already in the database
  const emailFind = await User.findOne({
    email: req.body.email,
  });
  if (emailFind) return res.status(400).send("Email already exists");

  // destructure the request body
  const {name, email, password, role} = req.body;

  // hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  // create a new user with the specified role
  try {
    const user = new User({
      name,
      email,
      password: hashPassword,
      role,
      
    });
    await user.save();
    res.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
export default router;
