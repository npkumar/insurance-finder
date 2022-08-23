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
  totalPrice: number;
}

export const initialState: CustomerPlanState = {
  plan: undefined,
  startDate: moment().add(1, "day").format(dateFormat),
  endDate: moment().add(1, "month").format(dateFormat),
  age: 18,
  price: 1000,
  totalPrice: 1000,
};

export const customerPlanSlice = createSlice({
  name: "customerPlanSlice",
  initialState,
  reducers: {
    resetState: () => initialState,
    setPlan: (state, action: PayloadAction<Plan>) => {
      state.plan = action.payload;
      state.price = action.payload?.price ?? 1000;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = moment(action.payload).format(dateFormat);
      state.endDate = moment(action.payload).add(1, "month").format(dateFormat);
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = moment(action.payload).format(dateFormat);
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setTotalPrice: (state) => {
      const noOfWeeks = Math.abs(
        moment(state.endDate).diff(moment(state.startDate), "weeks")
      );
      state.totalPrice = state.price * noOfWeeks;
    },
  },
});

export const {
  resetState,
  setPlan,
  setStartDate,
  setEndDate,
  setAge,
  setPrice,
  setTotalPrice,
} = customerPlanSlice.actions;

export const customerPlanReducer = customerPlanSlice.reducer;
