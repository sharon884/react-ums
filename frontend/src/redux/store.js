import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authslice"

const store = configureStore({
    reducer : {
        auth :authReducer,
    },
});

export default store;