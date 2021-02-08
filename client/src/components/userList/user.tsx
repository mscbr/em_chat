import React from 'react';
import { Container, Text } from '@chakra-ui/react';

import { IUser } from 'types/user';

interface Props {
  user: IUser;
  background?: string;
}

const User: React.FC<Props> = ({
  user: { username, detectionData },
  background
}) => {
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
        {username}
      </Text>
      {detectionData
        ?.filter((set) => !!set.expressions)
        .map((object, g) => {
          return Object.entries(object.expressions)
            .filter(([key, value]) => value > 0.2)
            .map(([key, value], i) => (
              <Text key={`${username}${i}${g}`}>
                {key + ': ' + Math.round(value * 100) / 100}
              </Text>
            ));
        })}
    </Container>
  );
};

export default User;
