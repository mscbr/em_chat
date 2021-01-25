import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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
  const [userId, setUserId] = useLocalStorage('userId');

  const [username, setUsername] = useState('');
  const [error, setError] = useState<string>('');

  if (storage) return <Redirect to="/chat" />;

  const handleSubmit = () => {
    const uuid = uuidv4();
    if (uuid && username) {
      setUserId(uuid);
      setStorage(username);
    } else {
      setError('Valid username is required!');
    }
  };

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
                handleSubmit();
              }
            }}
          />
          <FormHelperText>enter your chat nick</FormHelperText>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
          <Button
            onClick={handleSubmit}
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
