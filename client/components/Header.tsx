import { Button, PageHeader } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SignOutButton = () => {
  return <Button onClick={() => signOut()}>Log out</Button>;
};
const Header = () => {
  const { data: session, status } = useSession();

  return (
    <PageHeader
      title="Insurance"
      extra={[
        <Link href="/" key="home">
          <Button type="primary">My Policies</Button>
        </Link>,
        session ? (
          <SignOutButton key="signout" />
        ) : (
          <Link href="/api/auth/signin" key="login">
            <Button type="primary">Log In</Button>
          </Link>
        ),
      ]}
    ></PageHeader>
  );
};

export default Header;
