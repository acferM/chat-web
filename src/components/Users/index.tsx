import { Container } from './styles';

type User = {
  id: string;
  name: string;
  avatar_url: string;
};

interface UsersProps {
  contacts: User[];
  setContact: (name: string, avatar_url: string) => void;
}

export function Users({ contacts, setContact }: UsersProps): JSX.Element {
  return (
    <Container>
      <h1>Users</h1>

      <main>
        {contacts.map(contact => (
          <button
            type="button"
            key={contact.id}
            onClick={() => setContact(contact.name, contact.avatar_url)}
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
