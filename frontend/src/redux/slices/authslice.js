import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import Cookies from "js-cookie";

const userInfoFromCookie = Cookies.get("jwt") ? true : false;

const initialState = {
    isAuthenticated : userInfoFromCookie,
     user : null
};

const authslice = createSlice ({
    name : "auth" ,
    initialState,
    reducers : {
        login : ( state ,action ) =>{
            state.isAuthenticated =!!action.payload; 
            state.user = action.payload;
        },
        logout :( state ) => {
            state.isAuthenticated = false ;
            state.user = null;
            Cookies.remove("jwt");
        },
        setUser: (state, action) => {
            state.user = action.payload;
          }
    }, 
});

export const { login , logout ,setUser } = authslice.actions;
export default authslice.reducer;