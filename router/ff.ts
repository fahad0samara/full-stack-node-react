import User from "../model/User";
import Doctor from "../model/doctor";

const doctorRouter = express.Router();

doctorRouter.post("/register", async (req, res) => {
  try {
    const {email} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({error: "User already exists"});
    }
    const user = new User(req.body);
    await user.save();
    const doctor = new Doctor({
      user: user._id,
      ...req.body.doctor,
    });
    await doctor.save();
    res.status(201).json({message: "Doctor registered successfully"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

doctorRouter.get("/:doctorId", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId).populate("user");
    if (!doctor) {
      return res.status(404).json({error: "Doctor not found"});
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

doctorRouter.patch("/:doctorId", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.doctorId,
      req.body,
      {new: true}
    );
    if (!doctor) {
      return res.status(404).json({error: "Doctor not found"});
    }
    res.json({message: "Doctor updated successfully", doctor});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

doctorRouter.delete("/:doctorId", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.doctorId);
    if (!doctor) {
      return res.status(404).json({error: "Doctor not found"});
    }
    await User.findByIdAndDelete(doctor.user);
    res.json({message: "Doctor deleted successfully"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = doctorRouter;
