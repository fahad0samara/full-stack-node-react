
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import patientRouter from './router/registerPatient';


app.use(express.json());
app.use(cors());

app.use('/auth', patientRouter);








app.set('port', process.env.PORT || 3000) 

app.get('/', (req, res ): void => {
    res.send('<h1>Hello world<h1>');
})




app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})