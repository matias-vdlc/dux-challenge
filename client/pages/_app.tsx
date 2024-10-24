import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PrimeReactProvider } from 'primereact/api'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider>
      <Component {...pageProps} />
    </PrimeReactProvider>
  )
}
