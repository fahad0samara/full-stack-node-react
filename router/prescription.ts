import express from "express";
const router = express.Router();
import Patient from "../model/patient";
import Prescription from "../model/prescription";

const {addPrescriptionsValidation} = require("../middleware/validtion");

router.post("/addPrescriptions/:healthID", async (req, res) => {
  // validate the data before we make a user
  const {error} = addPrescriptionsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database

  const healthIDExist = await Patient.findOne({
    healthID: req.params.healthID,
  });
  if (!healthIDExist) return res.status(400).send("Health ID does not exist");

  try {
    const patient = await Patient.findOne({healthID: req.params.healthID});
    if (!patient) {
      return res.status(400).send("Patient not found");
    }

    const prescription = new Prescription({
      healthID: req.params.healthID,
      patientID: req.body.patientID,
      doctorID: req.body.doctorID,
      patient: patient._id,
      doctor: req.body.doctor,
      date: req.body.date,
      medicines: req.body.medicines,
      tests: req.body.tests,
      dosage: req.body.dosage,
      hospital: req.body.hospital,

      advice: req.body.advice,
      nextVisit: req.body.nextVisit,
    });
    const savedPrescription = await prescription.save();
    res.send({
      savedPrescription,
    });

    res.send(prescription);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
      error,
    });
  }
});

router.get("/getPrescriptions/:healthID", async (req, res) => {
  try {
    const patient = await Patient.findOne({healthID: req.params.healthID});
    if (!patient) {
      return res.status(400).send("Patient not found");
    }
    const prescriptions = await Prescription.find({
      patient: patient._id,
    });
    res.send(prescriptions);
  } catch (error) {
    res
      .status(400)
      .send("Error in getting prescriptions, please try again later");
  }
});

export default router;
