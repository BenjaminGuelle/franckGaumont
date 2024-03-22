import "@/styles/globals.css";
import type { AppProps } from "next/app";

import {DM_Sans} from 'next/font/google';

const dmFont = DM_Sans({subsets: ['latin']})

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>{`
        html {
          font-family: ${dmFont.style.fontFamily};
        }
      `}</style>
    <Component {...pageProps} />
  </>;
}
