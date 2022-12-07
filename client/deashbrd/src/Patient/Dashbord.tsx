import {Link, useNavigate} from "react-router-dom";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import {useLogIN} from "../../ContextLog";
import Table from "./Table";
const Dashboard = (props: any) => {
  const {log, setLog, Profile, setProfile, loading, setLoading} = useLogIN();
  const navigate = useNavigate();

  console.log(
    "🚀 ~ file: Dashbord.tsx ~ line 10 ~ Dashboard ~ Profile",
    Profile.name
  );

  const [Toggle, setToggle] = useState("Dashboard");

  const convertDate = (date: any) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="ml-20">
      <div className="body-without-footer max-h-min bg-bgprimary ">
        <div className=" main ">
          <div className="">
            <div className="flex  h-12 m-2 bg-bgprimary rounded mt-4  ">
              <div>
                <h1 className="text-2xl font-poppins font-bold p-2 ">
                  DashBoard Today
                </h1>
              </div>

              <div className="flex ml-20  h-10   ">
                <input
                  placeholder="Search"
                  className="w-96 rounded ml-4 text-xl   pl-4 border focus:outline-none "
                ></input>
                <div className="bg-black pl-2 rounded ">serc</div>
              </div>
              <Link to="/patient/profile">
                <button className="flex bg-white rounded shadow  px-4  ml-60 h-14 ">
                  patient_profile
                </button>
              </Link>
            </div>
          </div>
          <div
            className="
            grid grid-cols-2 gap"
          >
            <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
              <a className="block rounded-xl bg-white p-6 sm:p-8" href="">
                <div className="mt-16 sm:pr-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    Science of Chemistry
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                    adipisci.
                  </p>
                </div>
              </a>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
              <a className="block rounded-xl bg-white p-6 sm:p-8" href="">
                <div className="mt-16 sm:pr-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    Science of Chemistry
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                    adipisci.
                  </p>
                </div>
              </a>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
              <a className="block rounded-xl bg-white p-6 sm:p-8" href="">
                <div className="mt-16 sm:pr-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    Science of Chemistry
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                    adipisci.
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="m-4 p-4">
              <div>
                <h1 className="font-bold font-poppins text-xl ">
                  Patient Details
                </h1>
              </div>
              <div className="bg-white font-poppins p-4 mt-4 px-8 rounded-xl shadow">
                <div className="flex">
                  <div>
                    <h1>Name : </h1>
                  </div>

                  <div className="flex ml-2   ">
                    <h1 className="pl-1">
                      {Profile ? Profile.name.firstName : ""}
                    </h1>

                    <h1 className="pl-1">
                      {Profile ? Profile.name.middleName : ""}
                    </h1>
                    <h1 className="pl-1">
                      {Profile ? Profile.name.LastName : ""}
                    </h1>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h1>Date : </h1>
                  </div>
                  <div className="ml-2">
                    <h1>{Profile ? convertDate(Profile.date) : ""}</h1>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h1>Blood group : </h1>
                  </div>
                  <div className="ml-2">
                    <h1>{Profile ? Profile.bloodGroup : ""}</h1>
                  </div>
                </div>
                <div>
                  <h1 className="font-bold mt-4">Past Health History</h1>
                  <div>{`${
                    //diseaseList
                    Profile ? Profile.diseaseList[0].disease : ""
                  } (${Profile ? Profile.diseaseList[0].YearRound : ""})`}</div>
                  <div>{`${Profile ? Profile.allergyList[0].allergy : ""} (${
                    Profile ? Profile.allergyList[0].YearRound : ""
                  })`}</div>

                  <div>{`${
                    Profile ? Profile.medicationList[0].medication : ""
                  } (${
                    Profile ? Profile.medicationList[0].YearRound : ""
                  })`}</div>
                </div>
              </div>
            </div>
            {/* recent health check up start */}
            <div className="m-4 p-4 ">
              <div>
                <h1 className="font-bold font-poppins text-xl ">
                  Recent Health Checkup
                </h1>
              </div>
              {/* {Profile
                ? Profile.checkupList.map((mappedData: any) => {
                    return (
                      <div className="bg-white mt-4 font-poppins p-4 rounded-xl shadow px-8">
                        <div className="flex ">
                          <div>
                            <h1>Consultant Doctor :</h1>
                          </div>
                          <div className="ml-2">
                            <h1>{`Dr. ${mappedData.doctor}`}</h1>
                          </div>
                        </div>
                        <div className="flex">
                          <div>
                            <h1>Date :</h1>
                          </div>
                          <div className="ml-2">
                            <h1>{convertDate(mappedData.createdAt)}</h1>
                          </div>
                        </div>
                        <div className="flex">
                          <div>
                            <h1>Diagnosis :</h1>
                          </div>
                          <div className="ml-2">
                            <h1>{mappedData.diagnosis}</h1>
                          </div>
                        </div>
                        <div className="flex">
                          <div>
                            <h1>Prescription :</h1>
                          </div>
                          <div className="ml-2">
                            <h1>{mappedData.prescription}</h1>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div> */}
              {/* recent health check up end */}
            </div>
            <div className="m-4 p-4">
              <div>
                <div>
                  <h1 className="font-bold font-poppins text-xl ">
                    Recent Lab Test
                  </h1>
                </div>
                <Table/>

             
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
