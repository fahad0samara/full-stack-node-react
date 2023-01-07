export interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface User {
  email: string;
  password: string;
}

export interface HospitalAddress {
  city: string;
  building: string;
  state: string;
  ZipCode: string;
  Country: string;
}

export interface Doctor {
  _id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  user: {
    email: string;
    password: string;
    createdAt: string;
  };
  phoneNumber: string;
  Hospital: string;
  HospitalAddress: {
    city: string;
    building: string;
    state: string;
    ZipCode: string;
    Country: string;
  };
  specialty: string;
  degree: string;
  experience: string;
  date: string;
  bloodGroup: string;
}



export interface Data {
  filter(arg0: (doctor: any) => boolean): import("react").SetStateAction<Data>;
  map(arg0: (doctor: any) => JSX.Element): import("react").ReactNode;
  length: number;


  name: Name;
  user: User;
  phoneNumber: string;
  Hospital: string;
  HospitalAddress: HospitalAddress;
  specialty: string;
  degree: string;
  experience: string;
  date: string;
  bloodGroup: string;
}




