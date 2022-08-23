import { CustomerPlan } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<CustomerPlan | { message: string }>
) {
  const { startDate, endDate, planId, age, totalPrice } = req.body;
  const session = await getSession({ req });

  if (session?.user) {
    const result = await prisma?.customerPlan.create({
      data: {
        startDate,
        endDate,
        age,
        totalPrice,
        plan: { connect: { id: planId } },
        customer: { connect: { email: session?.user?.email as string } },
      },
    });
    return res.json(result);
  }

  return res.status(403).json({ message: "Unauthorized" });
}
