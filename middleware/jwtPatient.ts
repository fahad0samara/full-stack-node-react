import jwt  from "jsonwebtoken";
import Patient from "../model/patient";
import Doctor from "../model/doctor";
import Admin from "../model/admin";



interface JwtPayload {
  _id: string;
}
// auth the patient
export const authPatient = async (req: any, res: any, next: any) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.patient = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}
    
// auth the doctor
export const authDoctor = async (req: any, res: any, next: any) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.doctor = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

// auth the admin
export const authAdmin = async (req: any, res: any, next: any) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        // @ts-ignore

        process.env.JWT_SECRET as unknown as JwtPayload
      );
        
      const mango = await Admin.findOne({_id: decoded._id});

      if (!mango) {
        return res.status(400).send("User not found");
      }
      req.mango = mango;
      next();
    } catch (err) {
      return res.status(400).send("Invalid token");
    }
  } else {
    return res.status(400).send("you don't have premise to access this page");
    
  }
};
// auth the admin






