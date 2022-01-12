import { Container } from './styles';

type User = {
  id: string;
  name: string;
  avatar_url: string;
};

interface UsersProps {
  contacts: User[];
}

export function Users({ contacts }: UsersProps): JSX.Element {
  return (
    <Container>
      <h1>Groups</h1>

      <main>
        {contacts.map(contact => (
          <button type="button" key={contact.id}>
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
