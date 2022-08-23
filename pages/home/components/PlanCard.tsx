import { Avatar, Card, Col, Row, Space, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import { useSession } from "next-auth/react";
import { dateFormat } from "../../../features/customerPlan/customerPlanSlice";

interface IndexProps {
  endDate: Date;
  startDate: Date;
  title: string;
  description: string;
  totalPrice: number;
}

const PlanCard: React.FC<IndexProps> = ({
  endDate,
  startDate,
  title,
  description,
  totalPrice,
}) => {
  const { data: session } = useSession();

  return (
    <Card loading={!session}>
      <Meta
        avatar={<Avatar src={session?.user?.image} />}
        title={title}
        description={description}
      />
      <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
        <Col>
          <Tag color="purple">
            <span>Total cost: {totalPrice}円</span>
          </Tag>
        </Col>
        <Col>
          <Tag color="green">
            Starting date: {moment(startDate).format(dateFormat)}
          </Tag>
        </Col>
        <Col>
          <Tag color="magenta">
            Ending date: {moment(endDate).format(dateFormat)}
          </Tag>
        </Col>
      </Row>
    </Card>
  );
};

export default PlanCard;
