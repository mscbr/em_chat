import { AppProps } from 'next/app';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
