import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authslice";
import adminSlice from  "../redux/slices/adminSlices";
import { persistStore, persistReducer } from "redux-persist";
import  storage  from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key : "auth" ,
    storage,
};

const rootReducer = combineReducers({
    auth : persistReducer(persistConfig,authReducer),
    admin : adminSlice ,
})
const store = configureStore({
    reducer : rootReducer ,
    middleware :(getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;