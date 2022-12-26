import express from "express";
const router = express.Router();
import Patient from "../model/patient";

const {addPrescriptionsValidation} = require("../middleware/validtion");

router.post("/addPrescriptions/:id", async (req, res) => {
  // validate the data before we make a user
  const {error} = addPrescriptionsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
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
  /* Pushing the prescriptions object into the prescriptions array. */
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

export default router;
