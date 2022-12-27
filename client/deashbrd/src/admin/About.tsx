import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  "auth/login",
  async authData => {
      const response = axios.post("auth/token/login/", {
          email: authData.email,
          password: authData.password
    });
    return response.data;
    },
  
    {
        condition: (_authData, { getState }) => {
            const { auth } = getState();
            if (auth.status === "loading") {
                return false;
            }

        

            if (auth.token) {
                return false;
            }

            return true;

        }




    

   
    },


       
    
);



export const logoutUser = createAsyncThunk(
    "auth/logout",
    async () => {
        const response = axios.post("auth/token/logout/");
        return response.data;
    }

    

);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "idle",
        error: null,
        token: null,
        user: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.token = action.payload.auth_token;
        },
        [loginUser.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },
        [logoutUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.token = null;
        },
        [logoutUser.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        }
    }
});

export const { setToken } = authSlice.actions;

export const selectToken = state => state.auth.token;
export const selectUser = state => state.auth.user;
export const selectStatus = state => state.auth.status;
export const selectError = state => state.auth.error;

export default authSlice.reducer;

// Path: client\deashbrd\src\admin\About.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectStatus, selectError, loginUser, logoutUser } from "./authSlice";

export function About() {
    const token = useSelector(selectToken);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const dispatch = useDispatch();
    
    const handleLogin = () => {
        dispatch(loginUser({ email: "",
            password: ""
        }));
        
    }

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <div>
            <h1>About</h1>
            <p>Token: {token}</p>
            <p>Status: {status}</p>
            <p>Error: {error}</p>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}




    
   
  

  






