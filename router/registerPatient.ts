import express from 'express'
const router = express.Router();
import Patient from "../model/patient";
const { registerValidation } = require("../middleware/validtion");


router.post("/registerpatient",
    async (req, res) => {
        // validate the data before we make a user
        const { error } = registerValidation(req.body);

        if (error) return res.status(400).send(error.details[0].message);

     
        const patient = new Patient(req.body);
        try {
            await patient.save();
           
            res.status(201).send({ patient,});
        } catch (err) {
            res.status(400).json({ 
                message:(err as Error).message

            });
              
        }
    }
);


router.get("/getpatient", async (req, res) => {

    try {
        const patient = await Patient.find();
        res.status(200).send(patient);
    } catch (err) {
        res.status(400).json({
            message: (err as Error).message
        });
    }
});


       






export default router;