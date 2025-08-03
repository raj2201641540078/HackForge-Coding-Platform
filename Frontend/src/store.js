import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";

const store = configureStore({
    reducer: {
        authSlice: authSliceReducer
    }
});

export default store;