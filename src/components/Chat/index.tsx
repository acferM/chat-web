/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { FiSmile } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Socket } from 'socket.io-client';
import { api } from '../../services/api';

import { Container } from './styles';

type Contact = {
  name: string;
  login: string;
  avatar_url: string;
  type: 'user' | 'group';
};

type Message = {
  id: string;
  text: string;
  created_at: Date;
};

interface ChatProps {
  contact: Contact;
  socket: Socket;
}

export function Chat({ contact, socket }: ChatProps): JSX.Element {
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (contact) {
      if (contact.type === 'user') {
        socket.emit(
          'start_chat',
          {
            type: contact.type,
            userLogin: contact.login,
          },
          async chat_id => {
            setChatId(chat_id);

            const { data: requestMessages } = await api.get(
              `messages/${chat_id}`
            );

            setMessages(requestMessages);
          }
        );
      } else if (contact.type === 'group') {
        socket.emit(
          'start_chat',
          {
            type: contact.type,
            usersUrl: `https://api.github.com/orgs/${contact.login}/members`,
          },
          async chat_id => {
            setChatId(chat_id);

            const { data: requestMessages } = await api.get(
              `messages/${chat_id}`
            );

            setMessages(requestMessages);
          }
        );
      }
    }
  }, [contact, socket]);

  if (!contact) {
    return (
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ color: '#fff', fontFamily: 'Poppins' }}>
          Select a contact to start chat
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <header>
        <img src={contact.avatar_url} alt={contact.name} />

        <div>
          <h1>{contact.name}</h1>
          <p>Online</p>
        </div>
      </header>

      <main>
        {messages.map(message => (
          <article key={message.id}>
            <div>{message.text}</div>
            <p>{message.created_at}</p>
          </article>
        ))}
      </main>

      <footer>
        <label>
          <input type="text" placeholder="Type your message" />

          <button type="submit">
            <FiSmile size={20} />
          </button>
        </label>

        <button type="button">
          <RiSendPlaneFill size={25} />
        </button>
      </footer>
    </Container>
  );
}
