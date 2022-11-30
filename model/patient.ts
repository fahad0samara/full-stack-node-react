import mongoose from "mongoose";

//bcrypt

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(
    // @ts-ignore
    process.env.Patient_URI

    , {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err: any) => console.log(err, "error mongodeb"));
// const prescriptionSchema = require("./prescription");


const patientSchema = new mongoose.Schema({
    healthID: {
        type: String,
    },
    name: {
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,
            required: true
        },
        surName: {
            type: String,
            required: true
        },
    },
    date: {
        type: Date,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        minlength: 1, 
    },
    email: {
        type: String,
        required: true
     
    },
    NumberCard: {
        type: Number,
        min:7, 
        max: 999999999999, 
        unique: true,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true
    },
    address: {
        building: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        taluk: {
            type: String,
            required: true
        },
        district: {
            type: String,
          required: true
        },
        state: {
            type: String,
            required: true
        },
        pinched: {
            type: Number,
            
         required: true
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    diseases: [
        {
            disease: {
                type: String,
            },
            yrs: {
                type: Number,
            },
        },
    ],
    contactPerson: {
        name: {
            firstName: {
                type: String,
                required: true,
            },
            surName: {
                type: String,
               required: true,
            },
        },
        mobile: {
            type: String,
         required: true,
            minlength: 10
        },
        email: {
            type: String,
            lowercase: true,
      
        },
        relation: {
            type: String,
        },
        address: {
            building: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            taluk: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            },
            state: {
                type: String,
               required: true,
            },
            pinched: {
                type: Number,
           

      required: true,
            },
        },
    },


    // prescriptions: [prescriptionSchema],
});

// patientSchema.pre("save", async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// patientSchema.statics.login = async function (healthID, password) {
//     const patient = await this.findOne({ healthID });
//     if (!healthID) {
//         throw Error("Please enter HealthId");
//     }
//     if (patient) {
//         const auth = await bcrypt.compare(password, patient.password);
//         if (auth) {
//             return patient;
//         }
//         throw Error("Incorrect Password");
//     }
//     throw Error("Invalid HealthID");
// };

const Patient = mongoose.model("patient", patientSchema);


export default Patient;
