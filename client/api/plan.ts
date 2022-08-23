import { Plan } from "@prisma/client";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (res.status === 403) {
    const error = new Error("Forbidden");
    throw error;
  }

  return res.json();
};

export const usePlans = () => {
  const { data: plans, error } = useSWR<Plan[]>("/api/plans", fetcher);
  const isLoading = !error && !plans;
  const isError = !!error;
  const isForbidden = error?.message === "Forbidden";
  return { isLoading, isError, isForbidden, plans };
};
