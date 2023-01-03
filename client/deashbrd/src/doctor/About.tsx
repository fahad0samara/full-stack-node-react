// import axios from "axios";
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async authData => {
//     const response = axios.post("auth/token/login/", {
//       email: authData.email,
//       password: authData.password,
//     });
//     return response.data;
//   },

//   {
//     condition: (authData, {getState}) => {
//       const {auth} = getState();
//       if (auth.status === "loading") {
//         return false;
//       }
//     },

//     // Function to add our give data into cache
//     // Function to add our give data into cache

//   }
// );

// export const logoutUser = createAsyncThunk(
//     "auth/logout",
//     async () => {
//         const response = axios.post("auth/token/logout/");
//         return response.data;
//     }

// );

// export const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         status: "idle",
//         error: null,
//         token: null,
//         user: null,
//     },
//     reducers: {
//         setToken: (state, action) => {
//             state.token = action.payload;
//         }
//     },
//     extraReducers: {
//         [loginUser.pending]: (state, action) => {
//             state.status = "loading";
//         },
//         [loginUser.fulfilled]: (state, action) => {
//             state.status = "fulfilled";
//             state.token = action.payload.auth_token;
//         },
//         [loginUser.rejected]: (state, action) => {
//             state.status = "error";
//             state.error = action.error.message;
//         },
//         [logoutUser.pending]: (state, action) => {
//             state.status = "loading";
//         },
//         [logoutUser.fulfilled]: (state, action) => {
//             state.status = "fulfilled";
//             state.token = null;
//         },
//         [logoutUser.rejected]: (state, action) => {
//             state.status = "error";
//             state.error = action.error.message;
//         }
//     }
// });

// export const { setToken } = authSlice.actions;

// export const selectToken = state => state.auth.token;
// export const selectUser = state => state.auth.user;
// export const selectStatus = state => state.auth.status;
// export const selectError = state => state.auth.error;

// export default authSlice.reducer;

// // Path: client\deashbrd\src\admin\About.tsx
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { selectToken, selectStatus, selectError, loginUser, logoutUser } from "./authSlice";

// export function About() {
//     const token = useSelector(selectToken);
//     const status = useSelector(selectStatus);
//     const error = useSelector(selectError);
//     const dispatch = useDispatch();

//     const handleLogin = () => {
//         dispatch(loginUser({ email: "",
//             password: ""
//         }));

//     }

//     const handleLogout = () => {
//         dispatch(logoutUser());
//     }

//     return (
//         <div>
//             <h1>About</h1>
//             <p>Token: {token}</p>
//             <p>Status: {status}</p>
//             <p>Error: {error}</p>
//             <button onClick={handleLogin}>Login</button>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// }

import React, {useState} from "react";
import axios from "axios";
import {useLogIN} from "../../hooks/ContextLog";
const About = () => {
  const {
    logPatient,

    Profile,
    setProfile,
    loading,
    setLoading,
    dark,
    setdark,
  } = useLogIN();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = (e: any) => {
    // all input shod not empty and regayer
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

    if (name && email && password && role) {
      setSuccess("success");
    }

    if (!name || !email || !password) {
      setSuccess("");
    }

    if (name.length < 3) {
      setError("name must be more than 3 char");
    }
    if (email.length < 3) {
      setError("email must be more than 3 char");
    }
    if (password.length < 3) {
      setError("password must be more than 3 char");
    }
  };

  const onSubmit = async (e: {preventDefault: () => void}) => {
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
    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 5000);
      console.log("====================================");
      console.log(
        "🚀 ~ file: About.js ~ line 48 ~ onSubmit ~ error.response.data",
        error.response.data
      );
      console.log("====================================");
    }
  };

  return (
    <form
      className="bg-white mx-28 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={onSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
      </div>
      <div className="mb-4 flex">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 mr-4"
          htmlFor="role"
        >
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        {success && <p>{success}</p>}
      </div>
    </form>
  );
};

export default About;
