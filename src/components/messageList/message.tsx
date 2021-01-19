import React from 'react';
import { Container, Text } from '@chakra-ui/react';

import { IMessage } from 'types/message';

type Props = IMessage & { background?: string; width?: string };

const Message: React.FC<Props> = ({
  content,
  author,
  timeStamp,
  background,
  width
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
      w={width || 'auto'}
    >
      <Text fontSize="lg" fontWeight={800}>
        {author}
      </Text>
      <Text
        lineHeight={1}
        textAlign="justify"
        fontWeight={500}
        whiteSpace="pre-wrap"
      >
        {content}
      </Text>
      <Text mt={1} fontSize="xs" fontStyle="italic" fontWeight={200}>
        {new Date(timeStamp).toTimeString().slice(0, 5)}
      </Text>
    </Container>
  );
};

export default React.memo(Message);
