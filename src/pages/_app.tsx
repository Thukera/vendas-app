//import '@/styles/globals.css'
import 'bulma'
import type { AppProps } from 'next/app'
import 'components/common/loader/loader.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-dark-indigo/theme.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    < PrimeReactProvider >
      <Component {...pageProps} />
    </PrimeReactProvider >
  );
}

export default MyApp
