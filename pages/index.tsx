import { Button, Space } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Space>
          <Link href="/new">
            <Button type="primary" size="large">
              New Policy
            </Button>
          </Link>
        </Space>
      </main>
    </div>
  );
};

export default Home;
