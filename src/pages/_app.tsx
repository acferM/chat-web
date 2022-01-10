import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Global from '../styles/global';
import { darkTheme } from '../styles/themes/dark';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <Global />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
