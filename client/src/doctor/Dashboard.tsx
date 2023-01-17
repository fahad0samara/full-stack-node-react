import axios from "axios";

import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

const Dashboard = props => {

  console.log("====================================");
  console.log("🚀 ~ file: Dashboard.tsx ~ line 1 ~ Dashboard ~ id", props.id);
  console.log("====================================");
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    if (props.id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/doctor/doctors/${props.id}`
          );
          setDoctor(res.data);
          console.log("====================================");
          console.log("🚀 ~ file: Dashboard.tsx ~ line 1 ~ fetchData ~ res", res);
          console.log("====================================");

  
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [props.id]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
    </div>
    // <div
    //   className="
    //   flex
    //   justify-center
    //   items-center
    //   h-90vh
    //   bg-teal-400

    //   "
    // >
    //   {doctor && doctor.name.firstName}
    //   xzvxvxv
    //   {doctor && doctor.name.lastName}
    // </div>
  );
};

export default Dashboard;
