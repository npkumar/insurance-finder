import { Descriptions } from "antd";
import moment from "moment";
import { useCustomerPlanAppSelector } from "../../../app/hooks";

const Confirmation = () => {
  const { plan, startDate, endDate, age, price, totalPrice } =
    useCustomerPlanAppSelector();

  return (
    <Descriptions title="Plan Summary" bordered>
      <Descriptions.Item label="Product">{plan?.title}</Descriptions.Item>
      <Descriptions.Item label="Product Description">
        {plan?.description}
      </Descriptions.Item>
      <Descriptions.Item label="Starting time">
        {moment(startDate).format("YYYY-MM-DD")}
      </Descriptions.Item>
      <Descriptions.Item label="Ending Time" span={2}>
        {moment(endDate).format("YYYY-MM-DD")}
      </Descriptions.Item>
      <Descriptions.Item label="Age">{age}</Descriptions.Item>
      <Descriptions.Item label="Base Price">
        <span>{price}円</span>
      </Descriptions.Item>
      <Descriptions.Item label="Total Price">
        <span>{totalPrice}円</span>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default Confirmation;
