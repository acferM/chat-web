import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ChatContextProvider } from '../contexts/chat';
import Global from '../styles/global';
import { darkTheme } from '../styles/themes/dark';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <SessionProvider>
        <ChatContextProvider>
          <Global />
          <Component {...pageProps} />
        </ChatContextProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
