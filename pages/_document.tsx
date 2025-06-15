import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default class Document extends React.Component {
  render() {
    return (
      <Html lang="ru">
        <Head>
          {/* Статические мета-теги */}
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* Favicon */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon/favicon-32x32.png" type="image/png" sizes="32x32" />
          <link rel="icon" href="/favicon/favicon-16x16.png" type="image/png" sizes="16x16" />
          <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
          
          {/* Статические Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Vavada Casino" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          
          {/* Статический Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="/images/twitter-share.jpg" />
          
          {/* PWA */}
          <meta name="theme-color" content="#232338" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Vavada" />
          
          {/* Предзагрузка шрифтов */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" 
            rel="stylesheet"
          />
        </Head>
        
        <body className="bg-[#1c1c2d] text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}