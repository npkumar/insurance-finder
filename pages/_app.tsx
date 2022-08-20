import { SessionProvider } from 'next-auth/react';
import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from '../client/components/Header';
import Authenticator from '../client/components/Authenticator';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Authenticator>
        <Header />
        <Component {...pageProps} />
      </Authenticator>
    </SessionProvider>);
}

export default MyApp;
