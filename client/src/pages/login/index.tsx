import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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

import useLocalStorage from 'hooks/useLocalStorage';

const Login: React.FC = () => {
  const [storage, setStorage] = useLocalStorage('username');
  const [username, setUsername] = useState('');

  if (storage) return <Redirect to="/chat" />;

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
        }}
      >
        <FormControl id="username">
          <FormLabel>n i c k</FormLabel>
          <Input
            size="lg"
            value={username}
            onChange={({ target: { value } }) => setUsername(value)}
            onKeyDown={({ key }) => {
              if (key === 'Enter') {
                setStorage(username);
              }
            }}
          />
          <FormHelperText>enter your chat nick</FormHelperText>
          {false && <FormErrorMessage>E R R 0 R</FormErrorMessage>}
          <Button
            onClick={() => {
              setStorage(username);
            }}
            mt={4}
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
