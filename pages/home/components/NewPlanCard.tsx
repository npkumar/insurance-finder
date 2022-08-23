import { Avatar, Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCustomerPlans } from "../../../client/api/customerPlan";

const NewPlanCard = () => {
  const { data: session } = useSession();
  const { customerPlans, isLoading } = useCustomerPlans();

  const getTitle = () => {
    if (customerPlans && !isLoading) {
      return customerPlans?.length === 0
        ? "No Plans"
        : `${customerPlans?.length} Active Plans`;
    }
    return null;
  };

  return (
    <Card
      loading={!session || isLoading}
      title={getTitle()}
      extra={
        <Link href="/new">
          <Button type="primary">New Policy</Button>
        </Link>
      }
    >
      <Meta
        avatar={<Avatar src={session?.user?.image} />}
        title={session?.user?.name}
        description="Create a new plan to get started"
      />
    </Card>
  );
};

export default NewPlanCard;
