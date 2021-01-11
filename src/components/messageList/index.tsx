import React, { useRef, useCallback, useEffect } from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';

import Message from './message';
import { IMessage } from 'types/message';

interface Props {
  messages: IMessage[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  const upSm = useBreakpointValue({ base: false, md: true });
  const bottomMsgRef = useRef<HTMLDivElement>();

  const scrollToBottom = useCallback(() => {
    if (bottomMsgRef.current) bottomMsgRef.current.scrollIntoView();
  }, [bottomMsgRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, []);

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
          alignSelf={message.author === 'mscbr' ? 'flex-end' : 'flex-start'}
          key={`${i}-${message.timeStamp}`}
        >
          <Message
            {...message}
            background={message.author === 'mscbr' ? 'surfaceDark' : undefined}
            width={upSm ? '40vw' : '75vw'}
          />
        </Box>
      ))}
      <div ref={bottomMsgRef} />
    </Box>
  );
};

export default MessageList;
