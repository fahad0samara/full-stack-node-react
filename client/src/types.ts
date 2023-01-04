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

export interface Data {
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
