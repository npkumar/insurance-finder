import { Plan } from "@prisma/client";
import { Col, Row, Select } from "antd";
import { useEffect } from "react";
import styled from "styled-components";
import {
  useAppDispatch,
  useCustomerPlanAppSelector,
} from "../../../../app/hooks";
import { usePlans } from "../../../../client/api/plan";
import { setPlan } from "../../../../features/customerPlan/customerPlanSlice";

const StyledSelect = styled(Select)`
  width: 100%;
`;
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
        <StyledSelect
          disabled={isLoading}
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
        </StyledSelect>
      </Col>
      <Col span={24}>{plan?.description ?? "No description available"}</Col>
    </Row>
  );
};

export default TypeSelector;
