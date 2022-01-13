/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSession } from 'next-auth/react';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import dayjs from 'dayjs';
import { Picker, BaseEmoji } from 'emoji-mart';
import { FiSmile } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';

import { api } from '../../services/api';

import { Container } from './styles';
import 'emoji-mart/css/emoji-mart.css';

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
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const chatEnd = useRef<HTMLDivElement>(null);

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

            setMessages(formattedMessages.reverse());
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

            const formattedMessages = requestMessages.map(message => ({
              ...message,
              createdAt: dayjs(message.createdAt).format('DD/MM/YYYY HH:mm'),
            }));

            setMessages(formattedMessages.reverse());
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

      chatEnd.current?.scrollIntoView();
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
        <div ref={chatEnd} />
      </main>

      <form onSubmit={handleSendMessage}>
        <label>
          <input
            type="text"
            placeholder="Type your message"
            onChange={event => setTextInput(event.target.value)}
            value={textInput}
          />

          <button
            type="button"
            onClick={() => setIsEmojiPickerOpen(prevState => !prevState)}
          >
            <FiSmile size={20} />
          </button>

          {isEmojiPickerOpen && (
            <Picker
              set="twitter"
              theme="dark"
              color="#1A66FF"
              title="Pick a emoji…"
              onClick={(emoji: BaseEmoji) =>
                setTextInput(prevText => prevText + emoji.native)
              }
            />
          )}
        </label>

        <button type="submit">
          <RiSendPlaneFill size={25} />
        </button>
      </form>
    </Container>
  );
}
