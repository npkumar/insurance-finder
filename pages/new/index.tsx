import { Button, message, Result, Space, Steps } from "antd";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCustomerPlanAppSelector } from "../../app/hooks";
import { createCustomerPlan } from "../../client/api/customerPlan";
import Confirmation from "./components/Comfirmation";
import CustomerDetails from "./components/CustomerDetails";
import TypeSelector from "./components/TypeSelector";

const { Step } = Steps;

const steps = [
  {
    title: "Vehicle Type",
    content: <TypeSelector />,
  },
  {
    title: "Customer Details",
    content: <CustomerDetails />,
  },
  {
    title: "Confirmation",
    content: <Confirmation />,
  },
];

const NewPolicy: NextPage = () => {
  const { status } = useSession();
  const [current, setCurrent] = useState(0);
  const { startDate, endDate, plan, age, totalPrice } =
    useCustomerPlanAppSelector();
  const router = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleNewPlanSubmit = async () => {
    try {
      await createCustomerPlan({
        startDate,
        endDate,
        age,
        planId: plan?.id as string,
        totalPrice,
      });
      message.success("Payment complete!");
      router.push("/");
    } catch (_) {
      message.error("Payment failed. Please try again!");
    }
  };

  if (status === "unauthenticated") {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
      />
    );
  }

  return (
    <Space size={48} direction="vertical" style={{ width: "100%" }}>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
      <Space>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleNewPlanSubmit}>
            Proceed to Payment
          </Button>
        )}
        {current > 0 && <Button onClick={() => prev()}>Previous</Button>}
      </Space>
    </Space>
  );
};

export default NewPolicy;
