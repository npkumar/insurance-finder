import { Col, DatePicker, InputNumber, Row, Space } from "antd";
import moment from "moment";
import { useEffect } from "react";
import styled from "styled-components";
import {
  useAppDispatch,
  useCustomerPlanAppSelector,
} from "../../../../app/hooks";
import {
  dateFormat,
  setAge,
  setEndDate,
  setStartDate,
  setTotalPrice,
} from "../../../../features/customerPlan/customerPlanSlice";

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`;

const CustomerDetails = () => {
  const { startDate, endDate, price } = useCustomerPlanAppSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTotalPrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, price]);

  return (
    <Row gutter={[32, 32]}>
      <Col span={12}>
        <label>Start Date</label>
      </Col>
      <Col span={12}>
        <StyledDatePicker
          data-testid="starting-date"
          allowClear={false}
          value={moment(startDate)}
          disabledDate={(currentDate) => currentDate.isBefore(moment())}
          onChange={(value) => {
            dispatch(setStartDate(value?.format(dateFormat) as string));
          }}
        />
      </Col>

      <Col span={12}>
        <label>End Date</label>
      </Col>
      <Col span={12}>
        <StyledDatePicker
          data-testid="ending-date"
          allowClear={false}
          value={moment(endDate)}
          disabledDate={(currentDate) => currentDate.isBefore(startDate)}
          onChange={(value) => {
            dispatch(setEndDate(value?.format(dateFormat) as string));
          }}
        />
      </Col>

      <Col span={12}>
        <label>Customer Age</label>
      </Col>
      <Col span={12}>
        <StyledInputNumber
          defaultValue={18}
          controls
          min={18}
          max={75}
          onChange={(value) => {
            dispatch(setAge(value as number));
          }}
        />
      </Col>
    </Row>
  );
};

export default CustomerDetails;
