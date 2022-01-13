/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSession } from 'next-auth/react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import dayjs from 'dayjs';
import { FiSmile } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';

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
  createdAt: string;
  from: {
    email: string;
  };
};

interface ChatProps {
  contact: Contact;
  socket: Socket;
}

export function Chat({ contact, socket }: ChatProps): JSX.Element {
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState('');

  const { data: session } = useSession();

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

            const formattedMessages = requestMessages.map(message => ({
              ...message,
              createdAt: dayjs(message.createdAt).format('DD/MM/YYYY HH:mm'),
            }));

            setMessages(formattedMessages);
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

  useEffect(() => {
    socket.on('message', message => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          ...message,
          createdAt: dayjs(message.createdAt).format('DD/MM/YYYY HH:mm'),
        },
      ]);
    });
  }, [socket]);

  const handleSendMessage = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      socket.emit('message', { chat_id: chatId, text: textInput });

      setTextInput('');
    },
    [chatId, socket, textInput]
  );

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
          <article
            key={message.id}
            className={session?.user?.email === message.from.email && 'sent'}
          >
            <div>{message.text}</div>
            <p>{message.createdAt}</p>
          </article>
        ))}
      </main>

      <form onSubmit={handleSendMessage}>
        <label>
          <input
            type="text"
            placeholder="Type your message"
            onChange={event => setTextInput(event.target.value)}
            value={textInput}
          />

          <button type="button">
            <FiSmile size={20} />
          </button>
        </label>

        <button type="submit">
          <RiSendPlaneFill size={25} />
        </button>
      </form>
    </Container>
  );
}
