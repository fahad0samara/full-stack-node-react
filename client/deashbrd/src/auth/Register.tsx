import React, {useEffect, useState} from "react";
import axios from "axios";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

export default function Register(props: any) {
  const [Loading, setLoading] = useState(false);
  const [Toggle, setToggle] = useState("Patient");

  const [name, setName] = useState({
    firstName: "",
    middleName: "",
    LastName: "",
  });
  const [date, setdate] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [NumberCard, setNumberCard] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [address, setaddress] = useState({
    building: "",
    city: "",
    taluk: "",
    district: "",
    state: "",
    ZipCode: "",
  });
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [diseaseList, setDiseaseList] = useState([
    {disease: "", YearRound: ""},
  ]);

  const [allergyList, setAllergyList] = useState([
    {
      allergy: "",
      YearRound: "",
    },
  ]);

  const [medicationList, setMedicationList] = useState([
    {
      medication: "",
      YearRound: "",
    },
  ]);

  const [contactPerson, setcontactPerson] = useState({
    name: {
      firstName: "",
      LastName: "",
    },
    mobile: "",
    email: "",
    relation: "",
    age: "",

    address: {
      building: "",
      city: "",
      taluk: "",
      district: "",
      state: "",
      ZipCode: "",
    },
  });

  const addDisease = () => {
    const diseaseList1 = [...diseaseList];
    diseaseList1.push({disease: "", YearRound: ""});
    setDiseaseList(diseaseList1);
  };

  const addAllergy = () => {
    const allergyList1 = [...allergyList];
    allergyList1.push({allergy: "", YearRound: ""});
    setAllergyList(allergyList1);
  };

  const addMedication = () => {
    const medicationList1 = [...medicationList];
    medicationList1.push({
      medication: "",
      YearRound: "",
    });
    setMedicationList(medicationList1);
  };

  const handleRegisterPatient = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    setLoading(true);
    console.log(
      name,
      date,
      mobile,
      email,
      NumberCard,
      bloodGroup,
      address,
      password,
      confirmPassword,
      diseaseList,
      allergyList,
      medicationList
    );

    try {
      const {data} = await axios.post(
        "http://localhost:3000/auth/registerPatient",
        {
          name,
          date,
          mobile,
          email,

          bloodGroup,
          address,
          password,

          diseaseList,
          allergyList,
          medicationList,

          contactPerson,
        }
      );
      console.log("====================================");
      console.log(
        "🚀 ~ file: App.tsx ~ line 100 ~ handleRegisterPatient ~ data",
        data
      );
      console.log("====================================");
      setLoading(false);
      setSuccess(data.message);
      setTimeout(() => {
        alert(
          "Registration Successful. Please Login to continue. Redirecting to Login Page"
        );
      }, 2000);
    } catch (error) {
      console.log("====================================");
      console.log(
        // @ts-ignore
        error.response.data
      );

      console.log("====================================");
      setLoading(false);
      setError(
        // @ts-ignore
        error.response.data
      );
    }
  };

  return (
    <div
      className=" overflow-hidden 
      bg-black
    
    "
    >
      <div className=" w-full">
        <div className="">
          <div className=" flex justify-center ">
            <h1
              className="  p-2 px-8 rounded
              bg-gradient
              from-purple-400
              to-purple-600

              text-white font-bold text-5xl"
            >
              Register
            </h1>
          </div>

          <form
            className="   
            bg-gradient-to-l
          
            
             from-cyan-300
              to-cyan-300/90
              rounded-2xl
              
              shadow-2xl
              shadow-white
              shadow-opacity-50
              shadow-offset-4
              shadow-radius-4

             
              
              p-8
              md:p-14
              mx-4
              md:mx-32
              my-4
              md:my-8"
            onSubmit={handleRegisterPatient}
          >
            <div className="flex   mt-2 bg-bgsecondary w-fit  justify-between rounded mx-auto">
              <button
                onClick={() => setToggle("Patient")}
                className={
                  Toggle === "Patient"
                    ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-red-400 text-white"
                    : "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-bgsecondary"
                }
              >
                Patient
              </button>
              <button
                onClick={() => setToggle("Doctor")}
                className={
                  Toggle === "Doctor"
                    ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-black"
                    : "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-bgsecondary"
                }
              >
                Doctor
              </button>
            </div>
            <div
              className={
                Toggle === "Doctor"
                  ? "h-96 p-2 flex flex-col justify-center "
                  : "hidden"
              }
            >
              <h1 className="font-bold flex justify-center mt-6">
                For register as doctor contact to admin with you all information
              </h1>
              <div className="border-4 p-4 mx-auto w-1/2 rounded-xl mt-8  ">
                <h1>send your all information</h1>
                <div>
                  <div className=" rounded-xl p-4 mt-4 ">
                    <h1 className="font-bold">Email :</h1>
                    <p>admin@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={Toggle === "Patient" ? "" : "hidden"}>
              <div
                className="

              flex 
              md:flex-row 
                  flex-col justify-between lg:mt-4
              mt-2
                items-center
              "
              >
                <label className="font-bold lg:text-xl font-poppins lg:px-4 lg:my-4 ">
                  Name
                </label>
                <div
                  className="
               flex
              md:flex-row
              flex-col
              items-center


                "
                >
                  <input
                    className="
                        lg:my-2
                        lg:px-4
                        lg:py-2
                        mx-20
                        my-1
                          md:mx-1
                      

                
                  w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                  border-gray-300

              
                  
                    "
                    required
                    placeholder="
                  First Name"
                    type="text"
                    value={name.firstName}
                    onChange={e =>
                      setName({
                        ...name,
                        firstName: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    className="
                  lg:my-2
                        lg:px-4
                        lg:py-2
                        mx-20
                        my-1
                          md:mx-1
                  w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                  border-gray-300"
                    placeholder="Middle Name"
                    type="text"
                    value={name.middleName}
                    onChange={e =>
                      setName({
                        ...name,
                        middleName: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    className="
                  lg:my-2
                        lg:px-4
                        lg:py-2
                        md:mx-1
                        mx-20
                        my-1
                  w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                  border-gray-300

                    
                    "
                    required
                    placeholder="
                  Last Name"
                    type="text"
                    value={name.LastName}
                    onChange={e =>
                      setName({
                        ...name,
                        LastName: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div
                className="
              flex
              md:flex-row
              flex-col
              items-center
              
              "
              >
                <label
                  className="
                font-bold
                lg:text-xl
                font-poppins
                px-4
                my-4

                 "
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  className=" 
            
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                  required
                  value={date}
                  onChange={e => setdate(e.target.value)}
                ></input>
                <div
                  className="
                  flex
              md:flex-row
              md:items-center
              flex-col
              items-center
                "
                >
                  <label className="font-bold lg:text-xl px-4 ">
                    Mobile Number
                  </label>

                  <input
                    required
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    placeholder="Mobile Number"
                    type="number"
                    value={mobile}
                    onChange={e => setmobile(e.target.value)}
                  ></input>
                </div>
              </div>

              <div
                className="   flex
              md:flex-row
              flex-col
              items-center"
              >
                <label className="  lg:text-xl font-bold px-4 ">Email</label>
                <input
                  className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={e => setemail(e.target.value)}
                ></input>
                <div
                  className="            flex
              md:flex-row
              md:items-center
              flex-col
              items-center"
                >
                  <label className="  lg:text-xl font-bold px-4">
                    Blood Group
                  </label>
                  <div
                    className="
                  col-span-3
                  my-2
                  mx-2

                  "
                  >
                    <select
                      className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                      id="blood-group"
                      required
                      value={bloodGroup}
                      onChange={e => setbloodGroup(e.target.value)}
                    >
                      <option id="select">select</option>
                      <option id="A+">A+</option>
                      <option id="A-">A-</option>
                      <option id="B+">B+</option>
                      <option id="B-">B-</option>
                      <option id="AB+">AB+</option>
                      <option id="AB-">AB-</option>
                      <option id="O+">O+</option>
                      <option id="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                className="
              flex
              md:flex-row
              flex-col
              items-center


       
              

            
              "
              >
                <label
                  className=" 
                lg:text-xl
                font-bold
                px-4

                "
                >
                  Address
                </label>
                <div
                  className="
                  grid 
                  lg:grid-cols-3
                  md:grid-cols-2
                  grid-cols-1
                  gap-2
                  my-2
                

              
            
                 "
                >
                  <input
                    type="text"
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    required
                    placeholder="building/area"
                    value={address.building}
                    onChange={e =>
                      setaddress({
                        ...address,
                        building: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    required
                    placeholder="city"
                    value={address.city}
                    onChange={e =>
                      setaddress({
                        ...address,
                        city: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    required
                    placeholder="Taluka"
                    value={address.taluk}
                    onChange={e =>
                      setaddress({
                        ...address,
                        taluk: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    required
                    placeholder="District"
                    value={address.district}
                    onChange={e =>
                      setaddress({
                        ...address,
                        district: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    type="number"
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    required
                    placeholder="Pin-code"
                    value={address.ZipCode}
                    onChange={e =>
                      setaddress({
                        ...address,
                        ZipCode: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    placeholder="State"
                    required
                    value={address.state}
                    onChange={e =>
                      setaddress({
                        ...address,
                        state: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>

              <div
                className="
              grid
              md:grid-cols-2
               grid-cols-1
              gap-1
              my-2
              text-center
              lg:text-start
              

              
              "
              >
                <div
                  className="flex
              md:flex-row
              flex-col
              items-center
              "
                >
                  <label className="lg:text-xl font-bold mx-1 ">Password</label>
                  <input
                    type="password"
                    id="password"
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    required
                    placeholder="password"
                    value={password}
                    onChange={e => setpassword(e.target.value)}
                  ></input>
                </div>
                <div
                  className="flex
              md:flex-row
              flex-col
              items-center
              "
                >
                  <label className=" lg:text-xl font-bold text-center  mx-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  ></input>
                  <span className="text-sm py-1 text-red-500">
                    {password !== confirmPassword && "passwords do not match"}
                  </span>
                </div>
              </div>

              <div
                className="  grid lg:grid-cols-3
              md:grid-cols-2
      
       
            
             "
              >
                <div className="col-span-5 ">
                  <h1 className=" lg:text-xl  my-1 font-bold px-4 grid col-start-1 col-span-3">
                    Do you have a permanent illness?
                  </h1>
                </div>
                <div className="col-span-4  ">
                  {diseaseList.map((disease, index) => {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-7 col-span-1 mb-3"
                      >
                        <input
                          className="lg:h-10
                               lg:w-64
                                lg:rounded-lg
                                lg:px-4
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                  border-gray-300 
                            col-span-3 rounded-lg lg:pl-4 h-8 pl-2"
                          type="text"
                          name="

                          Asthma
                          "
                          value={disease.disease}
                          placeholder="
                          ex.Asthma
                          "
                          onChange={e => {
                            const values = [...diseaseList];
                            values[index].disease = e.target.value;
                            setDiseaseList(values);
                          }}
                        />
                        <input
                          className="lg:h-10
                                      lg:w-64
                                lg:rounded-lg
                                lg:px-4
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                  mx-3

                  border-gray-300 
                            col-span-3 rounded-lg lg:pl-4 h-8 pl-2"
                          type="text"
                          name="YearRound"
                          placeholder="
                          Severe asthma.
                       
                          "
                          value={disease.YearRound}
                          onChange={e => {
                            const values = [...diseaseList];
                            values[index].YearRound = e.target.value;

                            setDiseaseList(values);
                          }}
                        />

                        <div
                          className="col-span-1 pl-3"
                          onClick={() => {
                            if (diseaseList.length > 1) {
                              const values = [...diseaseList];
                              values.splice(index, 1);
                              setDiseaseList(values);
                            }
                          }}
                        >
                          <AiFillMinusCircle className="text-2xl text-red-500" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div onClick={addDisease} className="col-span-1">
                  <AiFillPlusCircle className="text-2xl text-green-500" />
                </div>
              </div>
            </div>
            {
              //addAllergy
            }
            <div
              className="grid lg:grid-cols-3
              md:grid-cols-2
              grid-cols-1
              gap-1
              my-2
              text-center
              lg:text-start
              "
            >
              <div className="col-span-5 ">
                <h1 className=" lg:text-xl  my-1 font-bold px-4 grid col-start-1 col-span-3">
                  do you have any allergy
                </h1>
              </div>
              <div className="col-span-4  ">
                {allergyList.map((allergy, index) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-7 col-span-1 mb-3"
                    >
                      <input
                        className="lg:h-10
                                lg:w-64
                                lg:rounded-lg
                                lg:px-4
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300
                            col-span-3 rounded-lg lg:pl-4 h-8 pl-2"
                        type="text"
                        name="allergy"
                        value={allergy.allergy}
                        placeholder=" ex. penicillin"
                        onChange={e => {
                          const values = [...allergyList];
                          values[index].allergy = e.target.value;
                          setAllergyList(values);
                        }}
                      />
                      <input
                        className="lg:h-10
                                lg:w-64
                                lg:rounded-lg
                                lg:px-4
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                  mx-3

                  border-gray-300
                            col-span-3 rounded-lg lg:pl-4 h-8 pl-2"
                        type="text"
                        name="
                        allergy

                        "
                        placeholder="
                        allergy

                        "
                        value={allergy.YearRound}
                        onChange={e => {
                          const values = [...allergyList];
                          values[index].YearRound = e.target.value;

                          setAllergyList(values);
                        }}
                      />

                      <div
                        className="col-span-1 pl-3"
                        onClick={() => {
                          if (allergyList.length > 1) {
                            const values = [...allergyList];
                            values.splice(index, 1);
                            setAllergyList(values);
                          }
                        }}
                      >
                        <AiFillMinusCircle className="text-2xl text-red-500" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div onClick={addAllergy} className="col-span-1">
                <AiFillPlusCircle className="text-2xl text-green-500" />
              </div>
            </div>
            {
              //addMedication
            }
            <div
              className="grid lg:grid-cols-3
              md:grid-cols-2
              grid-cols-1
              gap-1
              my-2
              text-center
              lg:text-start
              "
            >
              <div className="col-span-5 ">
                <h1 className=" lg:text-xl   font-bold px-4 grid col-start-1 col-span-3">
                  do you have any medication
                </h1>
              </div>
              <div className="col-span-4  ">
                {medicationList.map((medication, index) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-7 col-span-1 mb-3"
                    >
                      <input
                        className="lg:h-10
                                lg:w-64
                                lg:rounded-lg
                                lg:px-4 px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300
                            col-span-3 rounded-lg lg:pl-4 h-8 pl-2"
                        type="text"
                        name="Drops"
                        value={medication.medication}
                        placeholder=" ex.
                        Drops
                        "
                        onChange={e => {
                          const values = [...medicationList];
                          values[index].medication = e.target.value;
                          setMedicationList(values);
                        }}
                      />
                      <input
                        className="lg:h-10
                                lg:w-64
                                lg:rounded-lg
                                lg:px-4
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                  mx-3 border-gray col-span-3 rounded-lg lg:pl-4 h-8 pl-2"
                        type="text"
                        name="medication"
                        placeholder="medication"
                        value={medication.YearRound}
                        onChange={e => {
                          const values = [...medicationList];
                          values[index].YearRound = e.target.value;

                          setMedicationList(values);
                        }}
                      />

                      <div
                        className="col-span-1 pl-3"
                        onClick={() => {
                          if (medicationList.length > 1) {
                            const values = [...medicationList];
                            values.splice(index, 1);
                            setMedicationList(values);
                          }
                        }}
                      >
                        <AiFillMinusCircle className="text-2xl text-red-500" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div onClick={addMedication} className="col-span-1">
                <AiFillPlusCircle className="text-2xl text-green-500" />
              </div>
            </div>
            {
              //addDisease
            }

            <div className={Toggle === "Patient" ? "" : "hidden"}>
              <div className="flex justify-center">
                <h1 className=" p-4 rounded font-bold lg:text-3xl text-xl mt-2">
                  Emergency Contact Details
                </h1>
              </div>

              <div className=" flex md:flex-row flex-col items-center">
                <label className="font-bold lg:text-xl ">Name</label>
                <div
                  className="
        

                   "
                >
                  <input
                    className="
                  lg:mx-5
                  mx-14
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                  border-gray-300 
"
                    placeholder="first name"
                    required
                    value={contactPerson.name.firstName}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        name: {
                          ...contactPerson.name,
                          firstName: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    className=" 
              lg:mx-5
                  mx-14
                  my-2
         
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    placeholder="last name"
                    required
                    value={contactPerson.name.LastName}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        name: {
                          ...contactPerson.name,
                          LastName: e.target.value,
                        },
                      })
                    }
                  ></input>
                </div>
              </div>
              <div
                className=" flex
              md:flex-row

              flex-col  
              items-center"
              >
                <div
                  className="

              flex
              md:flex-row
              flex-col
              items-center
              text-center

              "
                >
                  <label className="font-bold lg:text-xl px-4 ">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="mobile no."
                    required
                    className=" 
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    value={contactPerson.mobile}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        mobile: e.target.value,
                      })
                    }
                  ></input>
                </div>

                <div
                  className="  flex
              md:flex-row
              flex-col
              items-center
              text-center"
                >
                  <label className="  lg:text-xl font-bold px-4">Email</label>
                  <input
                    type="email"
                    id="email"
                    className=" 
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    required
                    placeholder="email"
                    value={contactPerson.email}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        email: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div></div>
              <div
                className="

              flex
              md:flex-row
              flex-col
              items-center
              text-center

              "
              >
                <div
                  className="  flex
              md:flex-row
              flex-col
              items-center
              text-center"
                >
                  <label className=" rounded p-2 lg:text-xl font-bold px-4">
                    age
                  </label>
                  <input
                    type="date"
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    placeholder="
                  age"
                    required
                    value={contactPerson.age}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        age: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div
                  className="  flex
              md:flex-row
              flex-col
              items-center
              text-center"
                >
                  <label className=" rounded p-2 lg:text-xl font-bold px-4">
                    Relation / connection
                  </label>
                  <input
                    className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                    placeholder="
                    ex.bother / 
                    sister
                    "
                    value={contactPerson.relation}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        relation: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>

              <div
                className="
              flex
              md:flex-row
              flex-col
              items-center "
              >
                <label className=" lg:text-xl font-bold px-4 mb-8 col-span-1">
                  Address
                </label>
                <div
                  className="   grid 
                  lg:grid-cols-3
                  md:grid-cols-2
                  grid-cols-1
                  gap-2
                  my-2 "
                >
                  <input
                    type="text"
                    className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 "
                    required
                    placeholder="building/area"
                    value={contactPerson.address.building}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          building: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300"
                    required
                    placeholder="city"
                    value={contactPerson.address.city}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          city: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300"
                    required
                    placeholder="Taluka"
                    value={contactPerson.address.taluk}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          taluk: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300"
                    required
                    placeholder="District"
                    value={contactPerson.address.district}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          district: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    type="number"
                    className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300"
                    required
                    placeholder="Pin-code"
                    value={contactPerson.address.ZipCode}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          ZipCode: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300"
                    placeholder="State"
                    required
                    value={contactPerson.address.state}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          state: e.target.value,
                        },
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex justify-center mb-4 mt-8">
                {Loading ? (
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    disabled
                  >
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1zm0 0a8 8 0 018 8H9a7 7 0 00-7-7v-1zm0 0h1a8 8 0 018 8v1a7 7 0 00-7-7zm0 0h1a8 8 0 01-8 8 7 7 0 007-7v-1z"
                      ></path>
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    className="
                  bg-black


                  text-white
                  font-bold 
                  py-3
                  px-9
                  rounded
                  hover:bg-sky-50
                  hover:text-black


                  focus:outline-none
                  focus:shadow-outline
                  "
                    type="submit"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
