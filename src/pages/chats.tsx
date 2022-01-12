/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { io } from 'socket.io-client';
import { Chat } from '../components/Chat';

import { Contacts } from '../components/Contacts';
import { Sidebar } from '../components/Sidebar';

import { Container } from '../styles/Chat';

const socket = io('http://localhost:3333', {
  autoConnect: false,
});

export default function Chats(): JSX.Element {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      socket.connect();

      socket.volatile.emit('user_signin', {
        name: session.user.name,
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

        <Contacts />

        <Contacts />
      </section>

      <Chat />
    </Container>
  );
}
