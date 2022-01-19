/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSession } from 'next-auth/react';
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  chatId: string;
  text: string;
  createdAt: string;
  from: {
    email: string;
  };
};

interface ChatProps {
  contact: Contact;
  socket: Socket;
  chatId: string;
}

export function Chat({ contact, socket, chatId }: ChatProps): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const chatMessages = useMemo(() => {
    const filteredMessages = messages.filter(
      message => message.chatId === chatId
    );

    const formattedMessages = filteredMessages.map(message => ({
      ...message,
      createdAt: dayjs(message.createdAt).format('DD/MM/YYYY HH:mm'),
    }));

    return formattedMessages;
  }, [messages, chatId]);

  const chatEnd = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  useEffect(() => {
    socket.on('message', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);

      chatEnd?.current?.scrollIntoView();
    });
  }, [socket]);

  useEffect(() => {
    async function loadMessages(): Promise<void> {
      if (contact && chatId) {
        const { data: requestMessages } = await api.get(`messages/${chatId}`);

        setMessages(requestMessages.reverse());
      }
    }

    loadMessages();
  }, [contact, chatId]);

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
        {chatMessages.map(message => (
          <article
            key={message.id}
            className={
              session?.user?.email === message.from.email ? 'sent' : ''
            }
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
