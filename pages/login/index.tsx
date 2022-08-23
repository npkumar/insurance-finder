import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Result
      icon={<SmileOutlined />}
      title="Hello, we have all the best insurances!"
      extra={
        <Link href="/api/auth/signin" key="login">
          <Button type="primary">Log In</Button>
        </Link>
      }
    />
  );
};

export default Login;
