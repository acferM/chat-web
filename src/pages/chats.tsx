/* eslint-disable jsx-a11y/label-has-associated-control */
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { io } from 'socket.io-client';
import { Chat } from '../components/Chat';

import { Groups } from '../components/Groups';
import { Users } from '../components/Users';
import { Sidebar } from '../components/Sidebar';
import { api } from '../services/api';
import { github } from '../services/github';

import { Container } from '../styles/Chat';

type User = {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
};

type Org = {
  id: string;
  login: string;
  avatar_url: string;
  members_url: string;
};

type Contact = {
  name: string;
  login: string;
  avatar_url: string;
  type: 'user' | 'group';
};

interface ChatsProps {
  users: User[];
  orgs: Org[];
}

const socket = io('http://192.168.1.30:3333', {
  autoConnect: false,
});

export default function Chats({ users, orgs }: ChatsProps): JSX.Element {
  const { data: session, status } = useSession();
  const [selectedContact, setSelectedContact] = useState<Contact>(null);

  const handleUpdateSelectedContact = useCallback(
    (
      name: string,
      avatar_url: string,
      type: 'user' | 'group',
      login: string
    ) => {
      setSelectedContact({ name, avatar_url, type, login });
    },
    []
  );

  useEffect(() => {
    if (status === 'authenticated') {
      socket.connect();

      socket.emit('user_signin', {
        name: session.user.name,
        login: session.login,
        email: session.user.email,
        avatar_url: session.user.image,
      });
    }
  }, [session, status]);

  return (
    <Container>
      <Sidebar />

      <section>
        <label>
          <FiSearch size={24} color="#fff" />
          <input type="text" placeholder="Pesquisar" />
        </label>

        <Groups contacts={orgs} setContact={handleUpdateSelectedContact} />

        <Users
          contacts={users}
          setContact={handleUpdateSelectedContact}
          socket={socket}
        />
      </section>

      <Chat contact={selectedContact} socket={socket} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  github.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`;

  const { data: orgs } = await github.get<Org[]>(`user/orgs`);

  const formattedOrgs = orgs.map(org => ({
    ...org,
    members_url: org.members_url.replace('{/member}', ''),
  }));

  const { data: users } = await api.get<User[]>(`users/${session.login}`);

  return {
    props: {
      users,
      orgs: formattedOrgs,
    },
  };
};
