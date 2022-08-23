import { Plan } from "@prisma/client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const usePlans = () => {
  const { data: plans, error } = useSWR<Plan[]>("/api/plans", fetcher);
  const isLoading = !error && !plans;
  const isError = !!error;
  const isForbidden = error?.response?.status === 403;
  return { isLoading, isError, isForbidden, plans };
};
