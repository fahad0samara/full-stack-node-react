import express from "express";
const router = express.Router();

import jwt from "jsonwebtoken";
import Doctor from "../model/doctor";
import User from "../model/User";

import Patient from "../model/patient";
import Prescription from "../model/prescription";

const {
  doctorValidation,
  loginDoctorValidation,
  addPrescriptionsValidation,
} = require("../middleware/validtion");

// get route for doctor
router.get("/doctors", async (req, res) => {
  try {
    // Find all doctors and populate the user field
    const doctors = await Doctor.find().populate("user");

    // Send the doctors to the client
    res.json(doctors);
    // Send the doctor's information and email to the client
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// get route for  a doctor id
router.get("/doctors/:id", async (req, res) => {
  try {
    // Find the doctor by their ID and populate the user field
    const doctor = await Doctor.findById(req.params.id).populate("user");

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found",
      });
    }

    // Send the doctor's information to the client
    res.json(doctor);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});



router.post("/update-availability", async (req, res) => {
  try {
    // Find the doctor by their ID
    const doctor = await Doctor.findById(req.body.doctorId);

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found",
      });
    }
    // Update the doctor's working hours and availability
    doctor.workingHours = req.body.workingHours;
    doctor.availableDays = req.body.availableDays;
    doctor.availableTime = req.body.availableTime;

    // Save the updated doctor to the database
    await doctor.save();

    // Send a success message to the client
    res.json({message: "Working hours and availability updated successfully"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.patch("/doctors/:id/working-hours", async (req, res) => {
  try {
    // Find the doctor by their ID
    const doctor = await Doctor.findById(req.params.id);

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found",
      });
    }

    // Update the doctor's working hours
    doctor.workingHours = req.body.workingHours;

    // Save the updated doctor to the database
    await doctor.save();

    // Return the updated doctor
    res.json(doctor);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// GET route for getting the doctor's working hours
router.get("/working-hours/:id", async (req, res) => {
  try {
    // Find the doctor by their ID
    const doctor = await Doctor.findById(req.params.id);

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found",
      });
    }

    // Send the doctor's working hours to the client
    res.json(doctor.workingHours);



  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// PUT route for updating the doctor's working hours
router.put("/working-hours/:id", async (req, res) => {
  try {
    // Find the doctor by their ID
    const doctor = await Doctor.findById(req.params.id);

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found",
      });
    }


    // Update the doctor's working hours
    doctor.workingHours = req.body;
    await doctor.save();

    res.json({message: "Working hours updated successfully"});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.post("/Prescription", async (req, res) => {
  // validate the data before we make a doctor
  // const {error} = addPrescriptionsValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const patient = await Patient.findById(req.body.patient);
  if (!patient) return res.status(404).send("Patient not found");

  const doctor = await Doctor.findById(req.body.doctor);
  if (!doctor) return res.status(404).send("Doctor not found");
  try {
    const prescription = new Prescription({
      patient: req.body.patient,
      doctor: req.body.doctor,
      medication: req.body.medication,
      dosage: req.body.dosage,
      frequency: req.body.frequency,
      duration: req.body.duration,
      date: req.body.date,
      notes: req.body.notes,
      refills: req.body.refills,
    });

    const result = await prescription.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/prescription", async (req, res) => {
  try {
    // Find all prescriptions and populate the doctor and patient fields
    const prescriptions = await Prescription.find()
      .populate("patient")
      .populate("doctor")
      .exec();

    // Map over the prescriptions and return a new array with the desired properties
    res.json(
      prescriptions.map(prescription => {
        return {
          _id: prescription._id,
          //@ts-ignore
          doctor: `${prescription.doctor.name.firstName} ${prescription.doctor.name.lastName}`,
          //@ts-ignore
          patient: ` ${prescription.patient.name.firstName} ${prescription.patient.name.lastName}`,
          medication: prescription.medication,
          notes: prescription.notes,
          date: prescription.date,
          dosage: prescription.dosage,
          frequency: prescription.frequency,
          duration: prescription.duration,
          refills: prescription.refills,
        };
      })
    );
  } catch (error) {
    // If there is an error, send a response with a status of 500 and the error message
    res.status(500).json({message: error.message});
  }
});

// get the id
router.get("/prescription/:id", async (req, res) => {
  try {
    // Find the prescription by id and populate the doctor and patient fields
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient")

      .populate("doctor")
      .exec();

    // If the prescription is not found, send a response with a status of 404 and a message
    if (!prescription) {
      return res.status(404).json({message: "Prescription not found"});
    }

    // If the prescription is found, send a response with a status of 200 and the prescription
    res.status(200).json({
      message: "Prescription retrieved successfully",
      data: prescription,
    });
  } catch (error) {
    // If there is an error, send a response with a status of 500 and the error message
    res.status(500).json({message: error.message});
  }
});

router.get("/prescription/:id", (req, res) => {
  Prescription.findById(req.params.id)
    .populate("patient")
    .populate({
      path: "doctor",
      populate: {
        path: "user",
      },
    })

    .exec((err, prescription) => {
      if (err) {
        return res.status(500).json({error: err});
      }
      if (!prescription) {
        return res.status(404).json({message: "Prescription not found"});
      }
      res.json({
        message: "Prescription retrieved successfully",

        data: prescription,
      });
    });
});

// router.get("/", async (req, res) => {
//   try {
//     const prescriptions = await Prescription.find().populate("doctor");
//     res.json(
//       prescriptions.map(prescription => {
//         return {
//           _id: prescription._id,
//           patient: prescription.patient,
//           medication: prescription.medication,
//           notes: prescription.notes,
//           date: prescription.date,
//           doctor: `${prescription.doctor.name.firstName} ${prescription.doctor.name.lastName}`,
//         };
//       })
//     );
//   } catch (error) {
//     res.status(500).json({message: error.message});
//   }
// });

module.exports = router;

// router.get("/prescription/:id", (req, res) => {
//   Prescription.findById(req.params.id)
//     .populate("patient")
//     .populate({
//       path: "doctor",
//       populate: {
//         path: "User",
//       },
//     })

//     .exec((err, prescription) => {
//       if (err) {
//         return res.status(500).json({error: err});
//       }
//       if (!prescription) {
//         return res.status(404).json({message: "Prescription not found"});
//       }
//       res.json({
//         message: "Prescription retrieved successfully",
//         data: prescription,
//       });
//     });
// });

router.get("/prescription/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient")
      .populate({
        path: "doctor",
        populate: {
          path: "User",
        },
      });
    if (!prescription) {
      return res.status(404).json({message: "Prescription not found"});
    }
    res.status(200).json({
      message: "Prescription retrieved successfully",
      data: prescription,
    });
  } catch (err) {
    res.status(500).json({message: "Internal Server Error", error: err});
  }
});

// create a new doctor
// router.post("/register", async (req, res) => {
//   // validate the data before we make a doctor
//   const {error} = doctorValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   // check if the User is already in the database
//   const Userfind = await User.findById(req.body.user);
//   if (!Userfind) return res.status(400).send("User not1 found");

//   // check if the User the role is doctor
//   if (Userfind.role !== "doctor") return res.status(400).send("User not doctor");

//   // check if the doctor is already in the database
//   const userExist = await Doctor.findOne({
//     user: req.body.user,
//   });
//   if (userExist) return res.status(400).send("User already exists");

//   const doctor = new Doctor({
//     user: req.body.user,
//     name: req.body.name,
//     Hospital: req.body.Hospital,
//     HospitalAddress: req.body.HospitalAddress,
//     date: req.body.date,
//     phoneNumber: req.body.phoneNumber,
//     bloodGroup: req.body.bloodGroup,
//     degree: req.body.degree,
//     specialty: req.body.specialty,
//     experience: req.body.experience,
//   });
//   try {
//     const newDoctor = await doctor.save();
//     res.status(201).json(newDoctor);
//   } catch (err) {
//     res.status(400).json({message: err.message});
//   }
// });

// // get the dr
// router.get("/getDoctor", async (req, res) => {
//   try {
//     const doctor = await Doctor.find().populate("user")
//     res.json(doctor);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }

// });

// // loginDoctor
// // router.post("/loginDoctor", async (req, res) => {
// //   // validate the data before we make a doctor
// //   const {error} = loginDoctorValidation(req.body);
// //   if (error) return res.status(400).send(error.details[0].message);

// //   // check if the doctor is already in the database
// //   try {
// //     const doctor = await User.findOne({
// //       email: req.body.email,
// //     });
// //     if (!doctor) return res.status(400).send("Email is not found");

// //     // create and assign a token
// //     const token = jwt.sign({_id: doctor._id}, process.env.JWT_SECRET as string);
// //     res.header("auth-token", token);

// //     res.json({
// //       token,
// //       doctor,
// //     });
// //   } catch (error) {
// //     res.status(400).json({
// //       message: (error as Error).message,
// //       error,
// //     });
// //   }
// // });

// router.post("/addPrescriptions/:id", async (req, res) => {
//   // validate the data before we make a user
//   const {error} = addPrescriptionsValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   try {
//    /* Finding a patient by id and if it is not found it is returning a 400 status code with a message. */
//     const patient = await Patient.findOne({
//       _id: req.params.id,
//     });
//     if (!patient) return res.status(400).send("Patient not found");

//     const prescriptions = {
//       doctorID: req.body.doctorID,
//       medicines: req.body.medicines,
//       department: req.body.department,
//       date: req.body.date,
//       doctor: req.body.doctor,
//       advice: req.body.advice,
//       dosage: req.body.dosage,
//       nextVisit: req.body.nextVisit,
//       tests: req.body.tests,
//     };
//     patient.prescriptions.push(prescriptions);
//     const savedPatient = await patient.save();
//     res.send({
//       savedPatient,
//     });
//   } catch (err) {
//     res.status(400).json({
//       err,
//     });
//   }
// });

// router.post("/patients/:id/prescriptions", (req, res) => {
//   const patientId = req.params.id;
//   const prescription = req.body;

//   // Add the prescription to the patient's prescriptions array
//   Patient.findByIdAndUpdate(
//     patientId,
//     {$push: {prescriptions: prescription}},
//     {new: true}
//   )
//     .then(updatedPatient => res.send(updatedPatient))
//     .catch(err => res.status(400).send(err));
// });

// router.get("/getPrescriptions/:id", async (req, res) => {
//   try {
//     const patient = await Patient.findOne({
//       _id: req.params.id,
//     });
//     if (!patient) return res.status(400).send("Patient not found");

//     res.send({
//       patient,
//     });
//   } catch (err) {
//     res.status(400).json({
//       err,
//     });
//   }
// });

// router.get("/getPatients", async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.send({
//       patients,
//     });
//   } catch (err) {
//     res.status(400).json({
//       err,
//     });
//   }
// });

// router.get("/getPatient/:id", async (req, res) => {
//   try {
//     const patient = await Patient.findOne({
//       id: req.params.id,
//     });
//     if (!patient) return res.status(400).send("Patient not found");

//     res.send({
//       patient,
//     });
//   } catch (err) {
//     res.status(400).json({
//       err,
//     });
//   }
// });

// router.get("/getPatientForDoctor/:id", async (req, res) => {
//   try {
//     const patient = await Patient.find({
//       prescriptions: {
//         $elemMatch: {
//           doctorID: req.params.id,
//         },
//       },
//     });
//     if (!patient) return res.status(400).send("Patient not found");

//     res.send({
//       patient,
//     });
//   } catch (err) {
//     res.status(400).json({
//       err,
//     });
//   }
// });

// // Create a new prescription
// router.post('/pre', (req, res) => {

//   Patient.findById(req.body.patient, (err: any, patient: any) => {
//     if (err || !patient) {
//       return res.status(400).send('Invalid patient ID');
//     }

//     Doctor.findById(req.body.doctor, (err: any, doctor: any) => {
//       if (err || !doctor) {
//         return res.status(400).send('Invalid doctor ID');
//       }

//       const prescription = new Pre(req.body);
//       prescription.save((err: any) => {
//         if (err) {
//           return res.send(err);
//         }
//         res.json({ message: 'Prescription created successfully' });
//       });
//     });
//   });
// });

// // Get all prescriptions
// router.get('/pre', (req, res) => {
//   Pre.find((err: any, prescriptions: any) => {
//     if (err) {
//       return
//     }
//     res.json(prescriptions);
//   });
// });

// // Get a prescription by ID
// router.get('/pre/:id', (req, res) => {
//   Pre.findById(req.params.id, (err: any, prescription: any) => {
//     if (err) {
//       return
//     }
//     res.json(prescription);
//   });
// });

export default router;
