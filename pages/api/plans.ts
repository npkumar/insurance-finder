import { Plan, PrismaPromise } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Plan[] | undefined>
) {
    const plans = await prisma?.plan.findMany()
    res.status(200).json(plans);
}
