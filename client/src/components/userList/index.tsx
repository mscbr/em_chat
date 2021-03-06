import React from 'react';
import { Box } from '@chakra-ui/react';

import User from './user';
import { IUser } from 'types/user';

interface Props {
  username: string;
  users: IUser[];
}

const UserList: React.FC<Props> = ({ username, users }) => {
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
          key={user.username}
          background={user.username === username ? 'surfaceDark' : undefined}
        />
      ))}
    </Box>
  );
};

export default UserList;
