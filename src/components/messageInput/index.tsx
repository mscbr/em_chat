import React from 'react';

import { Button, Textarea, Container } from '@chakra-ui/react';

interface Props {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

const MessageInput: React.FC<Props> = ({ value, onChange, onSend }) => {
  const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (key === 'Enter') onSend();
  };
  return (
    <Container
      minH="100%"
      maxW="100%"
      padding={0}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Textarea
        value={value}
        onChange={onChange}
        placeholder="Your message..."
        onKeyDown={handleKeyDown}
        isFullWidth={true}
        flexGrow={1}
      />
      <Button onClick={onSend} size="sm" variant="outline" mt={4}>
        S E N D
      </Button>
    </Container>
  );
};

export default MessageInput;
