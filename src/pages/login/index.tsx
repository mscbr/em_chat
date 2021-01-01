import React, { useState } from 'react';
import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const Login: React.FC = () => {
  const [nick, setNick] = useState('');
  return (
    <Center
      border="15px solid black"
      borderRadius={5}
      h="100vh"
      w="100%"
      p="20%"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // event doesnt provide anything usefull
          // just write logic when onClick
        }}
      >
        <FormControl id="nick">
          <FormLabel>n i c k</FormLabel>
          <Input
            size="lg"
            value={nick}
            onChange={({ target: { value } }) => setNick(value)}
          />
          <FormHelperText>enter your chat nick</FormHelperText>
          {false && <FormErrorMessage>E R R 0 R</FormErrorMessage>}
          <Button
            mt={4}
            type="submit"
            variant="outline"
            border="2px"
            colorScheme="black"
            _hover={{
              bg: '#c5c5c5',
              borderColor: '#313131'
            }}
            rightIcon={<ArrowForwardIcon />}
          >
            ENTER
          </Button>
        </FormControl>
      </form>
    </Center>
  );
};

export default Login;
