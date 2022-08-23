import { Col, Result, Row, Skeleton } from "antd";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useCustomerPlans } from "../client/api/customerPlan";
import NewPlanCard from "./home/components/NewPlanCard";
import PlanCard from "./home/components/PlanCard";

const Home: NextPage = () => {
  const { status } = useSession();
  const { isLoading, isForbidden, customerPlans } = useCustomerPlans();

  if (status === "loading" || isLoading) {
    return <Skeleton avatar paragraph={{ rows: 4 }} />;
  }

  if (status === "unauthenticated" || isForbidden) {
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
    />;
  }

  return (
    <div>
      <Head>
        <title>Insurance App</title>
        <meta name="description" content="content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <NewPlanCard />
          </Col>

          {customerPlans?.map((customerPlan) => (
            <Col span={24} key={customerPlan.id}>
              <PlanCard
                endDate={customerPlan.endDate}
                startDate={customerPlan.startDate}
                title={customerPlan.plan?.title}
                description={customerPlan.plan?.description as string}
                totalPrice={customerPlan.totalPrice}
              />
            </Col>
          ))}
        </Row>
      </main>
    </div>
  );
};

export default Home;
