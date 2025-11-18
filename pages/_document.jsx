import { Html, Head, Main, NextScript } from 'next/document'

const setLangScript = `
  (function() {
    try {
      var dataElement = document.getElementById('__NEXT_DATA__');
      if (!dataElement) return;
      var data = JSON.parse(dataElement.textContent || '{}');
      var lang = data && data.props && data.props.pageProps && data.props.pageProps.language ? data.props.pageProps.language : 'ro';
      document.documentElement.setAttribute('lang', lang);
    } catch (error) {}
  })();
`

export default function Document() {
  return (
    <Html lang="ro">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/img/logo/tab-logo-notext.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{ __html: setLangScript }}
        />
      </body>
    </Html>
  )
}

