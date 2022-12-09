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
  const { log, setLog, Profile, setProfile, loading, setLoading,
    dark, setdark
  } = useLogIN();
  const navigate = useNavigate();

  console.log(
    "🚀 ~ file: Dashbord.tsx ~ line 10 ~ Dashboard ~ Profile",
    Profile.name
  );



  const convertDate = (date: any) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="ml-16">
      <div
        style={{
          backgroundColor: dark ? "#000" : "white",
          color: dark ? "white" : "black",
        }}
        className=""
      >
        <div className="  ">
          <div
            style={{
              backgroundColor: dark ? "#000" : "white",
              color: dark ? "white" : "black",
            }}
            className="flex flex-wrap"
            
          >
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                        Today's Money
                      </p>
                      <h5 className="mb-0 font-bold">
                        $53,000
                        <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                          +55%
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                      <i
                        className="ni ni-money-coins text-lg relative top-3.5 text-white"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                        Today's Money
                      </p>
                      <h5 className="mb-0 font-bold">
                        $53,000
                        <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                          +55%
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                      <i
                        className="ni ni-money-coins text-lg relative top-3.5 text-white"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid">
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
          </div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
