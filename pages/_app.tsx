import Head from 'next/head';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return <>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <Component {...pageProps} />;
    </>;
  
}

export default MyApp;