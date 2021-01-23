import React from 'react';
import { Box } from '@chakra-ui/react';

import User from './user';
import { users } from 'utils/mockData/users';

interface Props {
  username: string;
}

const UserList: React.FC<Props> = ({ username }) => {
  return (
    <Box
      display="flex"
      flexDir="column"
      height="100%"
      minH="100%"
      overflowY="auto"
    >
      {users.map((user) => (
        <User
          user={user}
          key={user}
          background={user === username ? 'surfaceDark' : undefined}
        />
      ))}
    </Box>
  );
};

export default UserList;
