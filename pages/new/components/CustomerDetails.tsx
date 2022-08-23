import { Col, DatePicker, InputNumber, Row, Space } from "antd";
import moment from "moment";
import { useAppDispatch, useCustomerPlanAppSelector } from "../../../app/hooks";
import {
  dateFormat,
  setAge,
  setStartDate,
} from "../../../features/customerPlan/customerPlanSlice";

const CustomerDetails = () => {
  const { startDate, endDate } = useCustomerPlanAppSelector();
  const dispatch = useAppDispatch();

  return (
    <Row gutter={[32, 32]}>
      <Col span={12}>
        <label>Start Date</label>
      </Col>
      <Col span={12}>
        <DatePicker
          defaultValue={moment(startDate)}
          style={{ width: "100%" }}
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
        <DatePicker
          defaultValue={moment(endDate)}
          style={{ width: "100%" }}
          disabledDate={(currentDate) => currentDate.isBefore(moment())}
          onChange={(value) => {
            dispatch(setStartDate(value?.format(endDate) as string));
          }}
        />
      </Col>

      <Col span={12}>
        <label>Customer Age</label>
      </Col>
      <Col span={12}>
        <InputNumber
          style={{ width: "100%" }}
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
