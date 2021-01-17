import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Grid, GridItem, Button, useBreakpointValue } from '@chakra-ui/react';

import MessageInput from 'components/messageInput';
import MesageList from 'components/messageList';
import { IMessage } from 'types/message';
import useLocalStorage from 'hooks/useLocalStorage';

import { messages as msgs } from 'utils/mockData/messages';

interface Props {
  username?: string;
}

const Chat: React.FC<Props> = ({ username }) => {
  const [_, __, clearStorage] = useLocalStorage('username');
  const upSm = useBreakpointValue({ base: false, md: true });
  const history = useHistory();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>(msgs);

  if (!username) return <Redirect to="/login" />;

  const handleSendMessage = () => {
    if (message)
      setMessages((state) => [
        ...state,
        {
          content: message,
          author: username,
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
      <GridItem bg="surface" p={8} display={!upSm ? 'none' : 'initial'}>
        USER LIST
      </GridItem>
      <GridItem bg="surface" rowSpan={2}>
        <MesageList messages={messages} username={username} />
      </GridItem>
      <GridItem
        bg="surface"
        p={8}
        rowSpan={2}
        display={!upSm ? 'none' : 'initial'}
      >
        USER PROFILE/CAMERA
        <Button
          onClick={() => {
            clearStorage();
            history.push('/');
          }}
          mt={16}
          bg="transparent"
          border="1px solid white"
        >
          LOGOUT
        </Button>
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
