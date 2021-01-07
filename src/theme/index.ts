import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    surface: '#000030',
    surfaceLight: '#000081',
    outline: '#E3E3E3',
    silver: '#A8A9AC',
    silverLight: 'CFCFCF'
  },
  textStyles: {
    basicText: {
      fontSize: ['14px', '16px'],
      letterSpacing: '0.3em',
      color: 'outline'
    }
  }
});
