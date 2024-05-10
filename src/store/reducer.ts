import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./index.js"

export default configureStore({
    reducer: {
        prodAuth : authReducer,
    }
});