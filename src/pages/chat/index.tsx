import React, { useState } from 'react';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';

import MessageInput from 'components/messageInput';

const Chat: React.FC = () => {
  const upSm = useBreakpointValue({ base: false, md: true });
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const handleSendMessage = () => {
    setMessages((state) => [...state, message]);
    setMessage('');
  };
  return (
    <Grid
      h="100vh"
      templateColumns={upSm ? '1fr 2fr' : '1fr'}
      templateRows="3fr 1fr 1fr"
      gap={1}
      color="white"
      background="white"
      border="2px solid white"
      borderRadius={5}
    >
      <GridItem bg="black" p={8} display={!upSm && 'none'}>
        USER LIST
      </GridItem>
      <GridItem bg="black" p={8} rowSpan={2}>
        <ul>
          {messages.map((item, i) => (
            <li key={`${i}-item`}>{item}</li>
          ))}
        </ul>
      </GridItem>
      <GridItem bg="black" p={8} rowSpan={2} display={!upSm && 'none'}>
        USER PROFILE/CAMERA
      </GridItem>
      <GridItem p={2} bg="black">
        <MessageInput
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onSend={handleSendMessage}
        />
      </GridItem>
    </Grid>
  );
};

export default Chat;
