import { Button, message, Steps } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Confirmation from "./components/Comfirmation";
import CustomerDetails from "./components/CustomerDetails";
import TypeSelector from "./components/TypeSelector";

const { Step } = Steps;

const steps = [
  {
    title: "Type",
    content: <TypeSelector />,
  },
  {
    title: "Details",
    content: <CustomerDetails />,
  },
  {
    title: "Confirmation",
    content: <Confirmation />,
  },
];

const NewPolicy: NextPage = () => {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Steps current={current} style={{ flex: 1 }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ flex: 2 }}>{steps[current].content}</div>
      <div>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              message.success("Payment complete!");
              router.push("/");
            }}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewPolicy;
