//import '@/styles/globals.css'
import 'bulma'
import type { AppProps } from 'next/app'
import 'components/common/loader/loader.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
