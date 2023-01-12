
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import patientRouter from './router/registerPatient';

import doctorRouter from './router/doctor';
import adminRouter from "./router/admin";
import user from "./router/user";
import Appointment from "./router/app";








app.use(express.json());
app.use(cors());

app.use('/appo', Appointment);

app.use('/auth', patientRouter);


// doctor
app.use('/doctor', doctorRouter);
 
// admin
app.use('/admin', adminRouter);

// user
app.use('/user', user);













app.set('port', process.env.PORT || 3000) 

app.get('/', (req, res ): void => {
    res.send('<h1>Hello world<h1>');
})




app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})