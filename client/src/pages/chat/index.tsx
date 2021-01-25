import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Grid,
  GridItem,
  Button,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';

import MessageInput from 'components/messageInput';
import MesageList from 'components/messageList';
import UserList from 'components/userList';
import useLocalStorage from 'hooks/useLocalStorage';
import useChat from 'hooks/useChat';

const Chat: React.FC = () => {
  const [username, __, clearStorage] = useLocalStorage('username');
  const { messages, sendMessage } = useChat();
  const upSm = useBreakpointValue({ base: false, md: true });
  const history = useHistory();

  const [message, setMessage] = useState('');

  if (!username) return <Redirect to="/login" />;

  const handleSendMessage = () => {
    if (message) sendMessage(message, username);
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
        <UserList username={username} />
      </GridItem>
      <GridItem bg="surface" rowSpan={2}>
        <MesageList messages={messages} username={username} />
      </GridItem>
      <GridItem
        bg="surface"
        p={8}
        rowSpan={2}
        display={!upSm ? 'none' : 'initial'}
        textAlign="center"
      >
        <Text fontSize="lg" fontWeight={800}>
          {username}
        </Text>
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
          onChange={({ target: { value } }) => {
            if (value[0] === '\n') return;
            setMessage(value);
          }}
          onSend={handleSendMessage}
        />
      </GridItem>
    </Grid>
  );
};

export default Chat;
