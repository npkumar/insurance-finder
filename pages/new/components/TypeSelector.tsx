import { Plan } from "@prisma/client";
import { Col, Row, Select } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useCustomerPlanAppSelector } from "../../../app/hooks";
import { usePlans } from "../../../client/api/plan";
import { setPlan } from "../../../features/customerPlan/customerPlanSlice";

const TypeSelector = () => {
  const { isLoading, plans } = usePlans();
  const { plan } = useCustomerPlanAppSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlan((plans ?? [])[0] as Plan));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plans]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Select
          disabled={isLoading}
          style={{ width: "100%" }}
          onChange={(value) => {
            dispatch(setPlan(plans?.find((plan) => plan.id === value) as Plan));
          }}
          value={plan?.id}
        >
          {plans?.map((plan) => {
            return (
              <Select.Option key={plan.id} value={plan.id}>
                {plan.title}
              </Select.Option>
            );
          })}
        </Select>
      </Col>
      <Col span={24}>{plan?.description ?? "No description available"}</Col>
    </Row>
  );
};

export default TypeSelector;
