import { SessionProvider } from "next-auth/react";
import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import HeaderCustom from "../client/components/Header";
import Authenticator from "../client/components/Authenticator";
import { Provider as ReduxProvider } from "react-redux";

import { Layout } from "antd";
import { store } from "../app/store";
import styled from "styled-components";

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  padding: 0 24px;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  margin: 0;
  height: 90vh;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Authenticator>
        <ReduxProvider store={store}>
          <HeaderCustom />
          <StyledLayout>
            <StyledContent>
              <Component {...pageProps} />
            </StyledContent>
          </StyledLayout>
        </ReduxProvider>
      </Authenticator>
    </SessionProvider>
  );
}

export default MyApp;
