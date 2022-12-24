import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";
const {
  registerUserValidation,
  loginUserValidation,
} = require("../middleware/validtion");

import {authAdmin, isAdmin, isAuth} from "../middleware/jwtPatient";

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
      name: req.body.name,
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
        

      })
   
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

        process.env.JWT_SECRET as string,

      );
      res.header("auth-token", token)
      
        .json({
          token,
          user,
        })
      

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

// get all users
router.get(
  "/getAllUsers",
isAuth,

  async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.json({message: (error as Error).message});
    }
  }
);

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

export default router;
