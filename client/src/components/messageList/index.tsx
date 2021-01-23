import React, { useRef, useCallback, useEffect } from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';

import Message from './message';
import { IMessage } from 'types/message';

interface Props {
  messages: IMessage[];
  username: string;
}

const MessageList: React.FC<Props> = ({ messages, username }) => {
  const upSm = useBreakpointValue({ base: false, md: true });
  const bottomMsgRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (bottomMsgRef.current) bottomMsgRef.current.scrollIntoView();
  }, [bottomMsgRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    <Box
      display="flex"
      flexDir="column"
      height="100%"
      minH="100%"
      p={16}
      borderTop="12px solid"
      borderColor="surface"
      overflowY="auto"
    >
      {messages.map((message, i) => (
        <Box
          alignSelf={message.author === username ? 'flex-end' : 'flex-start'}
          key={`${i}-${message.timestamp}`}
        >
          <Message
            {...message}
            background={message.author === username ? 'surfaceDark' : undefined}
            width={upSm ? '40vw' : '75vw'}
          />
        </Box>
      ))}
      <div ref={bottomMsgRef} />
    </Box>
  );
};

export default MessageList;
