import React from 'react';

import { Button, Textarea } from '@chakra-ui/react';

interface Props {}

const MessageInput: React.FC<Props> = ({}) => {
  return (
    <>
      <Textarea placeholder="Your message..." />
      <Button size="sm" variant="outline">
        S E N D
      </Button>
    </>
  );
};

export default MessageInput;
