import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import userReducer from "./features/userSlice";
import managementReducer from "./features/management/managementSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    profile: userReducer,
    management: managementReducer,
  },
});
