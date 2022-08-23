import { Plan } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

export const dateFormat = "YYYY-MM-DD";

export interface CustomerPlanState {
  plan?: Plan;
  startDate: string;
  endDate: string;
  age: number;
  price: number;
}

export const initialState: CustomerPlanState = {
  plan: undefined,
  startDate: moment().add(1, "day").format(dateFormat),
  endDate: moment().add(1, "month").format(dateFormat),
  age: 18,
  price: 1000,
};

export const customerPlanSlice = createSlice({
  name: "customerPlanSlice",
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<Plan>) => {
      state.plan = action.payload;
      state.price = action.payload?.price ?? 1000;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
  },
});

export const { setPlan, setStartDate, setEndDate, setAge, setPrice } =
  customerPlanSlice.actions;

export const customerPlanReducer = customerPlanSlice.reducer;
