import express from "express";
const router = express.Router();

import jwt from "jsonwebtoken";
import Doctor from "../model/doctor";
import User from '../model/User';
import Pre from "../model/pre"

import Patient from "../model/patient";
const {
  doctorValidation,
  loginDoctorValidation,
  addPrescriptionsValidation,
} = require("../middleware/validtion");

// create a new doctor
router.post("/register", async (req, res) => {
  // validate the data before we make a doctor
  const {error} = doctorValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the User is already in the database
  const Userfind = await User.findById(req.body.user);
  if (!Userfind) return res.status(400).send("User not1 found");

  // check if the User the role is doctor
  if (Userfind.role !== "doctor") return res.status(400).send("User not doctor");

  // check if the doctor is already in the database
  const userExist = await Doctor.findOne({
    user: req.body.user,
  });
  if (userExist) return res.status(400).send("User already exists");

  const doctor = new Doctor({
    user: req.body.user,
    name: req.body.name,
    Hospital: req.body.Hospital,
    HospitalAddress: req.body.HospitalAddress,
    date: req.body.date,
    phoneNumber: req.body.phoneNumber,
    bloodGroup: req.body.bloodGroup,
    degree: req.body.degree,
    specialty: req.body.specialty,
    experience: req.body.experience,
  });
  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// get the dr
router.get("/getDoctor", async (req, res) => {
  try {
    const doctor = await Doctor.find().populate("user")
    res.json(doctor);
  } catch (error) {
    res.status(500).send(error.message);
  }

});




// loginDoctor
// router.post("/loginDoctor", async (req, res) => {
//   // validate the data before we make a doctor
//   const {error} = loginDoctorValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   // check if the doctor is already in the database
//   try {
//     const doctor = await User.findOne({
//       email: req.body.email,
//     });
//     if (!doctor) return res.status(400).send("Email is not found");

//     // create and assign a token
//     const token = jwt.sign({_id: doctor._id}, process.env.JWT_SECRET as string);
//     res.header("auth-token", token);

//     res.json({
//       token,
//       doctor,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: (error as Error).message,
//       error,
//     });
//   }
// });






router.post("/addPrescriptions/:id", async (req, res) => {
  // validate the data before we make a user
  const {error} = addPrescriptionsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
   /* Finding a patient by id and if it is not found it is returning a 400 status code with a message. */
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

router.post("/patients/:id/prescriptions", (req, res) => {
  const patientId = req.params.id;
  const prescription = req.body;

  // Add the prescription to the patient's prescriptions array
  Patient.findByIdAndUpdate(
    patientId,
    {$push: {prescriptions: prescription}},
    {new: true}
  )
    .then(updatedPatient => res.send(updatedPatient))
    .catch(err => res.status(400).send(err));
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


// Create a new prescription
router.post('/pre', (req, res) => {
 

  Patient.findById(req.body.patient, (err: any, patient: any) => {
    if (err || !patient) {
      return res.status(400).send('Invalid patient ID');
    }

    Doctor.findById(req.body.doctor, (err: any, doctor: any) => {
      if (err || !doctor) {
        return res.status(400).send('Invalid doctor ID');
      }

      const prescription = new Pre(req.body);
      prescription.save((err: any) => {
        if (err) {
          return res.send(err);
        }
        res.json({ message: 'Prescription created successfully' });
      });
    });
  });
});

// Get all prescriptions
router.get('/pre', (req, res) => {
  Pre.find((err: any, prescriptions: any) => {
    if (err) {
      return
    }
    res.json(prescriptions);
  });
});

// Get a prescription by ID
router.get('/pre/:id', (req, res) => {
  Pre.findById(req.params.id, (err: any, prescription: any) => {
    if (err) {
      return
    }
    res.json(prescription);
  });
});







export default router;
