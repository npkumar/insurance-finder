import { CustomerPlan, Plan } from "@prisma/client";
import moment from "moment";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (res.status === 403) {
    const error = new Error("Forbidden");
    throw error;
  }

  return res.json();
};

export const useCustomerPlans = () => {
  const { data: customerPlans, error } = useSWR<
    {
      id: string;
      startDate: Date;
      endDate: Date;
      age: number;
      isActive: boolean;
      customerId: string | null;
      planId: string | null;
      totalPrice: number;
      plan: Plan;
    }[]
  >("/api/userPlan", fetcher);
  const isLoading = !error && !customerPlans;
  const isError = !!error;
  const isForbidden = error?.message === "Forbidden";
  return { isLoading, isError, isForbidden, customerPlans };
};

export const createCustomerPlan = async (data: {
  startDate: string;
  endDate: string;
  age: number;
  planId: string;
  totalPrice: number;
}): Promise<CustomerPlan> => {
  const response = await fetch("/api/customerPlan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      startDate: moment(data.startDate).toISOString(),
      endDate: moment(data.endDate).toISOString(),
    }),
  });

  return response.json();
};
