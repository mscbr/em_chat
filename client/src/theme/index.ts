import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    surface: '#434369',
    surfaceLight: '#2e2e80',
    surfaceDark: '#1e1e40',
    outline: '#E3E3E3',
    silverMain: '#A8A9AC',
    silverLight: 'CFCFCF'
  },
  textStyles: {
    basicText: {
      fontSize: ['14px', '16px'],
      letterSpacing: '0.1em',
      color: 'outline'
    }
  }
});
