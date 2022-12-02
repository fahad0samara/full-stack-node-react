const jwt = require("jsonwebtoken");
const Patient = require("../model/patient");
const authPatient = async (req: any, res: any, next: any) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token,
            process.env.TOKEN_SECRET);
        const patient = await Patient.findOne({
            _id: decoded._id,
            "tokens.token": token
        });
        if (!patient) {
            throw new Error();
        }
        req.token = token;
        req.patient = patient;
        next();
    } catch (err) {
        res.status(401).send({ error: "Please authenticate." });
    }
};
module.exports = authPatient;

