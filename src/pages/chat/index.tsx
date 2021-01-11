import React, { useState } from 'react';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';

import MessageInput from 'components/messageInput';
import MesageList from 'components/messageList';
import { IMessage } from 'types/message';

import { messages as msgs } from 'utils/mockData/messages';

const Chat: React.FC = () => {
  const upSm = useBreakpointValue({ base: false, md: true });
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>(msgs);
  const handleSendMessage = () => {
    if (message)
      setMessages((state) => [
        ...state,
        {
          content: message,
          author: 'mscbr',
          timeStamp: new Date().toISOString()
        }
      ]);
    setMessage('');
  };
  return (
    <Grid
      textStyle="basicText"
      h="100vh"
      templateColumns={upSm ? '1fr 2fr' : '1fr'}
      templateRows="3fr 1fr 1fr"
      gap={1}
      background="silver"
      border="8px solid"
      borderColor="silverMain"
      borderRadius={5}
    >
      <GridItem bg="surface" p={8} display={!upSm && 'none'}>
        USER LIST
      </GridItem>
      <GridItem bg="surface" rowSpan={2}>
        <MesageList messages={messages} />
      </GridItem>
      <GridItem bg="surface" p={8} rowSpan={2} display={!upSm && 'none'}>
        USER PROFILE/CAMERA
      </GridItem>
      <GridItem p={2} bg="surface">
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
