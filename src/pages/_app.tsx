import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/react';

import { theme } from 'theme';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
