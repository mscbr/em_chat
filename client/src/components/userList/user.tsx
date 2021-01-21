import React from 'react';
import { Container, Text } from '@chakra-ui/react';

interface Props {
  user: string;
  background?: string;
}

const User: React.FC<Props> = ({ user, background }) => {
  return (
    <Container
      bg={background || 'surfaceLight'}
      border="1px solid"
      borderColor="silverMain"
      borderRadius={5}
      mt={2}
      pt={1}
      pb={2}
      w="100%"
    >
      <Text fontSize="lg" fontWeight={800}>
        {user}
      </Text>
    </Container>
  );
};

export default User;
