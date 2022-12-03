
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

const cors = require("cors");
import patientRouter from './router/registerPatient';
import prescriptionRouter from './router/prescription';
import doctorRouter from './router/doctor';
import adminRouter from "./router/admin";


app.use(express.json());
app.use(cors());


app.use('/auth', patientRouter);

app.use('/Prescriptions', prescriptionRouter);

// doctor
app.use('/doctor', doctorRouter);
 
// admin
app.use('/admin', adminRouter);











app.set('port', process.env.PORT || 3000) 

app.get('/', (req, res ): void => {
    res.send('<h1>Hello world<h1>');
})




app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})