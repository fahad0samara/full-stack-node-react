import React, {useState} from "react";
import axios, {AxiosError} from "axios";
import { useLogIN } from "../../ContextLog";
import {useNavigate} from "react-router-dom";

const About: React.FC = () => {
  const {
    logPatient,

    Profile,
    setProfile,
    loading,
    setLoading,
    dark,
    setdark,
  } = useLogIN();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setrole] = useState<string>("");
const [error, setError] = useState<string | null>("");

  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
  if (e.target.name === "name") {
    setName(e.target.value);
  }
  if (e.target.name === "email") {
    setEmail(e.target.value);
  }
  if (e.target.name === "password") {
    setPassword(e.target.value);
    
  }
  if (e.target.name === "role") {
    setrole(e.target.value);
  }



  if (!name || !email || !password) {
    setSuccess("");
  }


  if (name.length > 3 && email.length > 3 && password.length > 3) {
    setError("");
  }
};

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/admin/register-user", {
        name,
        email,
        password,
        role,
      });

      setName("");
      setEmail("");
      setPassword("");
      setrole("");
      setSuccess("User Created");
     

    }
    catch (error) {
      if (error.response) {
        setError(error.response.data);
      }
      //deley the erorr
      setTimeout(() => {
        setError(null);
      }
        , 3000)
  
    }
  };

  return (
    <div
      className={`${
        dark ? "bg-black" : "bg-white"
        //color
      } ${dark ? "text-white" : "text-black"} 
        ${
          //font
          dark ? "font-bold" : "font-normal"
        }
         h-screen flex flex-col justify-center items-center`}
    >
      <div className="w-full max-w-xs">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {
          //error
          error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
         null
          )
        }
        {success
          ? (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">{success}</span>


            </div>
          )
          : null}
        
        </div>
        

      <form
        className=" mx-28 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onSubmit}
      >
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-4 flex">
          <label className="block  text-sm font-bold mb-2 mr-4" htmlFor="role">
            Role:
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={onChange}
            />
            <span className="ml-2">Admin</span>
          </label>

          <label className="inline-flex items-center ml-4">
            <input
              type="checkbox"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={onChange}
            />
            <span className="ml-2">User</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="checkbox"
              name="role"
              value="doctor"
              checked={role === "doctor"}
              onChange={onChange}
            />
            <span className="ml-2">Dr</span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-cyan-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>

          {success && <p>{success}</p>}
        </div>
      </form>
    </div>
  );
};

export default About;
