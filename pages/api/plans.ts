import { Plan } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Plan[] | undefined>
) {
  const plans = await prisma?.plan.findMany();
  res.status(200).json(plans);
}
