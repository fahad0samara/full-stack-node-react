
import axios from "axios";
import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import {useLogIN} from "../../ContextLog";

import {useLocation} from "react-router-dom";
const View = () => {
     const {
       logPatient,

       Profile,
       setProfile,
       loading,
       setLoading,
       dark,
       setdark,
     } = useLogIN()
    const { id } = useParams();
 const [data, setData] = React.useState<any>({
   name: {
     firstName: "",
     middleName: "",
     lastName: "",
   },
   user: {
     email: "",
     password: "",
   },

   phoneNumber: "",
   Hospital: "",
   HospitalAddress: {
     city: "",
     building: "",
     state: "",
     ZipCode: "",
     Country: "",
   },
   specialty: "",
   degree: "",
   experience: "",
   date: "",
   bloodGroup: "",
 });

    const [error, setError] = React.useState(false);


      useEffect(() => {
        axios
          .get(`http://localhost:3000/admin/doctor/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(res => {
            console.log(res.data);
            setData(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setError(true);
          });
      }, [id]);
    
  return (
    <div
      style={{
        backgroundColor: dark ? "#000" : "white",
        color: dark ? "white" : "black",
        boxShadow: dark
          ? "0px 0px 10px 0px rgb(103 232 249)"
          : "0px 0px 10px 0px #ccc",
      }}
    >
      <div className="p-16">
        <div className="p-8 shadow mt-24">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              {" "}
              <div>
                {" "}
                <p className="font-bold  text-xl">22</p>{" "}
                <p className="text-gray-400">Friends</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold  text-xl">10</p>{" "}
                <p className="text-gray-400">Photos</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold  text-xl">89</p>{" "}
                <p className="text-gray-400">Comments</p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="relative">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className=" py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Connect
              </button>{" "}
              <button className=" py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Message
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-20 text-center border-b pb-12 ">
            <h1 className="text-4xl  font-medium mx-3">
              Dr:
              <span className="font-light ml-3  ">{data.name.firstName}</span>
              <span className="font-light ml-3  ">{data.name.lastName}</span>
            </h1>
            <p className="font-light  mt-3">{data.Hospital}</p>
            <p className="font-light  mt-3">{data.HospitalAddress.Country}</p>
            <p className="mt-8 ">
              <span className="font-medium">Speciality:</span>{" "}
            </p>
            <p className="mt-2 ">{data.specialty}</p>{" "}
          </div>{" "}
          <div className="mt-12 flex flex-col justify-center">
            {" "}
            <p className="text-gray-600 text-center font-light lg:px-16">
   
            </p>{" "}
            <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
              {" "}
              Show more
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default View