import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  GridItem,
  Button,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';

import MessageInput from 'components/messageInput';
import MesageList from 'components/messageList';
import UserList from 'components/userList';
import VideoFeedback from 'components/videoFeedback';
import useLocalStorage from 'hooks/useLocalStorage';
import useChat from 'hooks/useChat';

const Chat: React.FC = () => {
  const [username, _, clearUsername] = useLocalStorage('username');
  const [userId, __, clearUserId] = useLocalStorage('userId');
  const { messages, sendMessage, users, error } = useChat(username, userId);
  const upSm = useBreakpointValue({ base: false, md: true });
  const history = useHistory();

  const [message, setMessage] = useState('');

  if (error)
    return (
      <Box m={24}>
        <h1>{error}</h1>
        <button
          onClick={() => {
            clearUsername();
            clearUserId();
            history.push('/');
          }}
        >
          GO BACK
        </button>
      </Box>
    );
  if (!username || !userId) return <Redirect to="/login" />;

  const handleSendMessage = () => {
    if (message && sendMessage) sendMessage(message, username);
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
        <UserList username={username} users={users || []} />
      </GridItem>
      <GridItem bg="surface" rowSpan={2}>
        <MesageList messages={messages || []} username={username} />
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
        <VideoFeedback />
        <Button
          onClick={() => {
            clearUsername();
            clearUserId();
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
