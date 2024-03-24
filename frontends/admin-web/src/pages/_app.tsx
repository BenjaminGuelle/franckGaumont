import "@/styles/globals.css";
import type { AppProps } from "next/app";

import {DM_Sans} from 'next/font/google';
import Head from 'next/head';

const dmFont = DM_Sans({subsets: ['latin']})

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>{`
        html {
          font-family: ${dmFont.style.fontFamily};
        }
      `}</style>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="./../../public/images/favicon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="./../../public/images/favicon.png" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <Component {...pageProps} />
  </>
}
