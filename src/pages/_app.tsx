import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Global from '../styles/global';
import { darkTheme } from '../styles/themes/dark';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <SessionProvider>
        <Global />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
