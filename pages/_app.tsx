import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/components/Header.css";
import "../styles/components/Profile.css";
import "../styles/components/Card.css";
import Head from "next/head";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My page title</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
