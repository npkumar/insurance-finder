import { SessionProvider } from "next-auth/react";
import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import HeaderCustom from "../client/components/Header";
import Authenticator from "../client/components/Authenticator";
import { Provider as ReduxProvider } from "react-redux";

import { Layout } from "antd";
import { store } from "../app/store";

const { Content } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Authenticator>
        <ReduxProvider store={store}>
          <HeaderCustom />
          <Layout style={{ padding: "0 24px" }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                height: "90vh",
              }}
            >
              <Component {...pageProps} />
            </Content>
          </Layout>
        </ReduxProvider>
      </Authenticator>
    </SessionProvider>
  );
}

export default MyApp;
