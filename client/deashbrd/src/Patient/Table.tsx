import {useLogIN} from "../../ContextLog";

const Table = () => {
  const {log, setLog, Profile, setProfile, loading, setLoading, dark} =
    useLogIN();
  const convertDate = (date: any) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${day}/${month}/${year}`;
  };
  return (
    <div
      className="
            
            overflow-x-auto
        
           
        mx-24
            my-7


  
       
          

    "
    >
      <table
        style={{
          backgroundColor: dark ? "#fff" : "#000",

          color: dark ? "#000" : "#fff",
        }}
        className="
  shadow-2xl
            shadow-cyan-300
            whitespace-nowrap
       
       
        
            divide-y
              divide-x
     divide-dotted
        
        
     

       "
      >
        <thead
          className="text-xs
           divide-x
            divide-y
         uppercase bg-cyan-300 "
        >
          <tr>
            <th
              style={{
                backgroundColor: dark ? "#fff" : "#000",

                color: dark ? "#000" : "rgb(103 232 249)",
              }}
              scope="col"
              className="py-3 px-6b "
            >
              Doctor
            </th>
            <th scope="col" className="py-3 px-6">
              Appointment date
            </th>
            <th
              style={{
                backgroundColor: dark ? "#fff" : "#000",

                color: dark ? "#000" : "rgb(103 232 249)",
              }}
              scope="col"
              className="py-3 text-center px-6 "
            >
              Hospital department
            </th>
            <th scope="col" className="py-3 text-center px-6 ">
              medicines
            </th>

            <th
              style={{
                backgroundColor: dark ? "#fff" : "#000",

                color: dark ? "#000" : "rgb(103 232 249)",
              }}
              scope="col"
              className="py-3 px-6 text-center"
            >
              Tests
            </th>
            <th scope="col" className="py-3 px-6 ">
              Prescription
            </th>
          </tr>
        </thead>
        <tbody
          className="text-sm
            divide-y-2 
            divide-x-2
           
        "
        >
          {Profile
            ? Profile.prescriptions.map((mappedData: any) => {
                return (
                  <tr className="border-b  bg-cyan-300">
                    <th
                      style={{
                        backgroundColor: dark ? "#fff" : "#000",

                        color: dark ? "#000" : "rgb(103 232 249)",
                      }}
                      className=" items-center  px-1    "
                    >
                      <img
                        className="w-5 h-5 rounded-full "
                        src="https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819__340.png"
                      />
                      <div className="">
                        <div className="text-base font-semibold">
                          {mappedData ? mappedData.doctor : null}
                        </div>
                        <div className="font-normal ">
                          neil.sims@flowbite.com
                        </div>
                      </div>
                    </th>
                    <td className="py-4 px-6 text-center">
                      {mappedData ? convertDate(mappedData.date) : null}
                    </td>

                    <td
                      style={{
                        backgroundColor: dark ? "#fff" : "#000",

                        color: dark ? "#000" : "rgb(103 232 249)",
                      }}
                      className="py-1 px-2 "
                    >
                      {mappedData?.department?.map((department: any) => {
                        return (
                          <div
                            className="
                                        text-center

                                       whitespace-nowrap "
                          >
                            <div className="text-base font-semibold ">
                              {department.name}
                            </div>
                            <div className="text-sm font-semibold ">
                              {department.type}
                            </div>
                          </div>
                        );
                      })}
                    </td>

                    <td className="py-1 px-2 text-center ">
                      {mappedData?.medicines?.map((medicine: any) => {
                        return (
                          <div
                            className="
                                        text-center

                                         whitespace-nowrap "
                          >
                            <div className="text-base font-semibold ">
                              {medicine.name}
                            </div>
                            <div className="text-sm font-semibold ">
                              {medicine.type}
                            </div>

                            <div className="text-sm font-semibold ">
                              {medicine.frequency}
                            </div>
                          </div>
                        );
                      })}
                    </td>

                    <td
                      style={{
                        backgroundColor: dark ? "#fff" : "#000",

                        color: dark ? "#000" : "rgb(103 232 249)",
                      }}
                      className="py-4 px-6 "
                    >
                      {mappedData ? mappedData.tests.name : null}
                    </td>

                    <td className="py-4 px-6 ">
                      {mappedData ? (
                        <a href={mappedData.prescription} download className="">
                          Download
                        </a>
                      ) : null}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
