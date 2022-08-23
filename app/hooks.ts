import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CustomerPlanState } from "../features/customerPlan/customerPlanSlice";

import { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => ThunkDispatch<
  {
    customerPlan: CustomerPlanState;
  },
  undefined,
  AnyAction
> &
  Dispatch<AnyAction> = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCustomerPlanAppSelector = (): CustomerPlanState =>
  useAppSelector((state) => state.customerPlan);
