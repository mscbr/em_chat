import React from 'react';

import { Button, Textarea } from '@chakra-ui/react';

interface Props {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

const MessageInput: React.FC<Props> = ({ value, onChange, onSend }) => {
  return (
    <>
      <Textarea
        value={value}
        onChange={onChange}
        placeholder="Your message..."
      />
      <Button onClick={onSend} size="sm" variant="outline">
        S E N D
      </Button>
    </>
  );
};

export default MessageInput;
