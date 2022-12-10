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
    <table
      style={{
        backgroundColor: dark ? "#000" : "white",
        color: dark ? "white" : "black",
        boxShadow: dark
          ? "0px 0px 10px 0px rgb(103 232 249)"
          : "0px 0px 10px 0px #ccc",
      }}
      className="
      w-96
      mx-auto
      mt-10

   
      rounded-lg

 
      shadow-lg

      
   



      

        "
    >
      <thead
        className="text-xs
           
         uppercase  "
      >
        <tr>
          <th scope="col" className="py-3 px-6b ">
            Doctor
          </th>
          <th scope="col" className="py-3 px-6">
            Appointment date
          </th>
        
          <th scope="col" className="py-3 text-center px-6 ">
            medicines
          </th>

          <th scope="col" className="py-3 px-6 text-center">
            Tests
          </th>
          <th scope="col" className="py-3 px-6 ">
            Prescription
          </th>
        </tr>
      </thead>
      <tbody
        className="text-sm
         
           
        "
      >
        {Profile
          ? Profile.prescriptions.map((mappedData: any) => {
              return (
                <tr className="">
                  <th className=" items-center  px-1    ">
             
                    <div className="">
                      <div className="text-base font-semibold">
                        {mappedData ? mappedData.doctor : null}
                      </div>
                      <div className="font-normal ">neil.sims@flowbite.com</div>
                    </div>
                  </th>
                  <td className="py-4 px-6 text-center">
                    {mappedData ? convertDate(mappedData.date) : null}
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

                  <td className="py-4 px-6 ">
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
  );
};

export default Table;
