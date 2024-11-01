import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='es'>
      <Head>
        <title>Dux Challenge</title>
        <meta
          name='description'
          content='technical front-end challenge dux software'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
