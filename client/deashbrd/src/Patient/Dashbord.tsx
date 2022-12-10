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
import {BiTime} from "react-icons/bi";
import {FcCalendar} from "react-icons/fc";

const Dashboard = (props: any) => {
  const {log, setLog, Profile, setProfile, loading, setLoading, dark, setdark} =
    useLogIN();
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);

  // show message if morning
  const [message, setMessage] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${hour}:${minute}`;
    const date1 = `${day}/${month}/${year}`;
    setTime(time);
    setDate(date1);
    setDay(day.toString());
    setMonth(month.toString());
    setYear(year.toString());
    setHour(hour.toString());
    setMinute(minute.toString());
    if (hour >= 0 && hour < 12) {
      setMessage("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setMessage("Good Afternoon");
    } else if (hour >= 17 && hour < 24) {
      setMessage("Good Evening");
    }
  }, []);

  const convertDate = (date: any) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="xl:ml-16 ml-12">
      <div
        style={{
          backgroundColor: dark ? "#000" : "white",
          color: dark ? "white" : "black",
        }}
        className=""
      >
        {
          // name and profile
        }
        <div className=" grid sm:grid-cols-2 xl:mx-12 grid-cols-1  ">
          <div className="flex flex-col justify-center p-4 mt-8 ">
            <h1 className="xl:text-3xl md:text-2xl text-xl font-bold text-cyan-300  ">
              <span
                style={{
                  backgroundColor: dark ? "#000" : "white",
                  color: dark ? "white" : "black",
                }}
                className="xl:text-3xl md:text-2xl text-xl font-bold mx-2"
              >
                {message}
              </span>

              {Profile ? Profile.name.firstName : ""}
            </h1>
            <h4 className="text-sm font-bold mt-1 ml-3 text-zinc-400  ">
              You'll be feeling healthy and strong again soon!
            </h4>
          </div>

          <div className="flex items-center mt-8 xl:ml-36 md:ml-28 mx-16   drop-shadow-lg   ">
            <div className="flex flex-col items-center mx-3">
              <span className="text-xl mx-2 shadow-cyan-300 shadow-xl ">
                <FcCalendar />
              </span>
              <span className="text-xl  font-semibold">{date}</span>
            </div>
            <div className="flex flex-col items-center mx-4">
              <span className="text-xl mx-2 shadow-cyan-300 shadow-xl ">
                <BiTime />
              </span>
              <span className="text-xl font-semibold">{time}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: dark ? "#000" : "white",
            color: dark ? "white" : "black",
          }}
          className="grid xl:grid-cols-3 md:grid-cols-2 mt-10 grid-cols-1 gap-2  md:mx-10  "
        >
          {
            //   Patient Details
          }
          <div
            style={{
              backgroundColor: dark ? "#000" : "white",
              color: dark ? "white" : "black",
              boxShadow: dark
                ? "0px 0px 10px 0px rgb(103 232 249)"
                : "0px 0px 10px 0px #ccc",
            }}
            className="p-5 rounded-2xl ml-7 w-72 md:ml-4 my-2 sm:my-0   md:w-80 "
          >
            <div className="flex flex-col justify-start">
              <h1 className="text-xl font-bold text-cyan-300  ">
                Patient Details
              </h1>
              <div className="flex flex-row justify-start mt-4 ">
                <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
                  Name:
                </h1>
                <h1
                  className="
                   font-extrabold  italic  ml-1
                 "
                >
                  {Profile ? Profile.name.firstName : ""}
                </h1>
              </div>
              <div className="flex flex-row justify-start mx-1  ">
                <h1 className="text-md font-bold text-zinc-400 italic   ">
                  middleName :
                </h1>
                <h1
                  className="
                   font-extrabold  italic  ml-1
                 "
                >
                  {Profile ? Profile.name.middleName : ""}
                </h1>
              </div>
              <div className="flex flex-row justify-start mx-1 ">
                <h1 className="text-md font-bold text-zinc-400 italic   ">
                  lastName :
                </h1>
                <h1
                  className="
                   font-extrabold  italic  ml-1
                 "
                >
                  {Profile ? Profile.name.LastName : ""}
                </h1>
              </div>
              <div className="flex flex-row justify-start  ">
                <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
                  Date of Birth :
                </h1>
                <h1
                  className="
                   font-extrabold  italic  ml-1
                 "
                >
                  {Profile ? convertDate(Profile.date) : ""}
                </h1>
              </div>
              <div className="flex flex-col justify-start mt-4"></div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: dark ? "#000" : "white",
              color: dark ? "white" : "black",
              boxShadow: dark
                ? "0px 0px 10px 0px rgb(103 232 249)"
                : "0px 0px 10px 0px #ccc",
            }}
            className="p-5 rounded-2xl ml-7 w-72 md:ml-4 my-4 sm:my-0   md:w-80 "
          >
            <div className="flex flex-col justify-start">
              <div className="flex flex-row justify-start mt-4 ">
                <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
                  healthIDNumber
                </h1>
                <h1
                  className="
                   font-extrabold text-cyan-400  italic  ml-1
                 "
                >
                  {Profile ? Profile.healthIDNumber : ""}
                </h1>
              </div>
              <div className="flex flex-row justify-start mx-1 my-1  ">
                <h1 className="text-md font-bold text-zinc-400 italic   ">
                  mobile :
                </h1>
                <h1
                  className="
                   font-extrabold  italic  ml-1
                 "
                >
                  {Profile ? Profile.mobile : ""}
                </h1>
              </div>
              <div className="flex flex-row justify-start mx-1 ">
                <h1 className="text-md font-bold text-zinc-400 italic   ">
                  email :
                </h1>
                <h1
                  className="
                   font-extrabold  italic  ml-1
                 "
                >
                  {Profile ? Profile.email : ""}
                </h1>
              </div>

              <div className="flex flex-row justify-start my-1  ">
                <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
                  bloodGroup
                </h1>
                <h1
                  className="
                   font-extrabold  italic  ml-1 
                 "
                >
                  {Profile ? Profile.bloodGroup : ""}
                </h1>
              </div>
              <div className="flex flex-col justify-start mt-4"></div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: dark ? "#000" : "white",
              color: dark ? "white" : "black",
              boxShadow: dark
                ? "0px 0px 10px 0px rgb(103 232 249)"
                : "0px 0px 10px 0px #ccc",
            }}
            className="p-5 rounded-2xl ml-7 w-72 md:ml-4 my-2 sm:my-0   md:w-80 "
          >
            <h1 className="text-xl font-bold text-cyan-300  ">
              Emergency contact person
            </h1>
            <div className="flex flex-col justify-start mt-4 ">
              {
                //firstName and LastName
              }
              <div className="flex flex-row justify-start ">
                <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
                  Name:
                </h1>
                <h1
                  className="
                    font-extrabold italic ml-1"
                >
                  {Profile ? Profile.contactPerson.name.firstName : ""}
                </h1>
                <h1
                  className="
                    font-extrabold italic ml-1"
                >
                  {Profile ? Profile.contactPerson.name.LastName : ""}
                </h1>
              </div>

              <div className="flex flex-row justify-start mx-1 my-1  ">
                <h1 className="text-md font-bold text-zinc-400 italic   ">
                  mobile :
                </h1>
                <h1
                  className="
                    font-extrabold  italic  ml-1
                  "
                >
                  {Profile ? Profile.contactPerson.mobile : ""}
                </h1>
              </div>
              <div className="flex flex-row justify-start mx-1 ">
                <h1 className="text-md font-bold text-zinc-400 italic   ">
                  email :
                </h1>
                <h1
                  className="
                    font-extrabold  italic  ml-1
                  "
                >
                  {Profile ? Profile.contactPerson.email : ""}
                </h1>
              </div>
              <div className="flex flex-row justify-start my-1  ">
                <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
                  relationship
                </h1>
                <h1
                  className="
                    font-extrabold  italic  ml-1
                  "
                >
                  {Profile ? Profile.contactPerson.relation : ""}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
