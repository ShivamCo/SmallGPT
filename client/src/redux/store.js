import { configureStore } from "@reduxjs/toolkit";
import historyReducer from './historySlice';
import authReducer from "./authSlice";


export const store = configureStore({
    reducer: {
        history: historyReducer,
        auth: authReducer,
    }
})