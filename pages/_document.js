import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class extends Document {
  render() {
    return (
      <Html lang="am">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.png" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
          />
          {/* <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
