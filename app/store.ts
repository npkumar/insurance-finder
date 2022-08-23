import { configureStore } from "@reduxjs/toolkit";
import { customerPlanReducer } from "../features/customerPlan/customerPlanSlice";

export const store = configureStore({
  reducer: {
    customerPlan: customerPlanReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
