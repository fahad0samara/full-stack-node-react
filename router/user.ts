import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";
const {
  registerUserValidation,
  loginUserValidation,
} = require("../middleware/validtion");

import {isAdmin, authAdmin} from "../middleware/jwtPatient";

// registerUser
router.post("/registerUser", async (req, res) => {
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
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
  });
  try {
    const savedUser = await user.save();
    res.send({
      savedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});

// loginUser
router.post("/loginUser", async (req, res) => {
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
        roles: user.roles,
      },

      // @ts-ignore

      process.env.JWT_SECRET as string
    );

    res.header("auth-token", token);
    res.status(200).json({
      success: true,
      token,
      user,
    });
    console.log("token", token);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});
  


// delete user
router.delete(
  "/deleteUser/:id",
  authAdmin,

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

export default router;
