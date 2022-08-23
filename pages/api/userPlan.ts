import { CustomerPlan } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomerPlan[] | { message: string }>
) {
  const session = await getSession({ req });
  if (session?.user) {
    const customerPlans = await prisma?.customerPlan.findMany({
      where: {
        customer: { email: session?.user?.email as string },
      },
      include: {
        plan: true,
      },
    });

    return res.status(200).json(customerPlans);
  }

  return res.status(403).json({ message: "Unauthorized" });
}
