import { Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { Container } from './styles';

type User = {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
};

interface UsersProps {
  contacts: User[];
  setContact: (
    name: string,
    avatar_url: string,
    type: 'user' | 'group',
    login: string
  ) => void;
  socket: Socket;
}

export function Users({
  contacts,
  setContact,
  socket,
}: UsersProps): JSX.Element {
  useEffect(() => {
    socket.on('notification', data => {
      console.log(data);
    });
  }, [socket]);

  return (
    <Container>
      <h1>Users</h1>

      <main>
        {contacts.map(contact => (
          <button
            type="button"
            key={contact.id}
            onClick={() =>
              setContact(
                contact.name,
                contact.avatar_url,
                'user',
                contact.login
              )
            }
          >
            <img src={contact.avatar_url} alt={contact.name} />

            <div>
              <strong>{contact.name}</strong>
              <p>Click to see messages!</p>
            </div>
          </button>
        ))}
      </main>
    </Container>
  );
}
