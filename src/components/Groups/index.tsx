import { Container } from './styles';

type Org = {
  id: string;
  login: string;
  avatar_url: string;
  members_url: string;
};

interface GroupsProps {
  contacts: Org[];
  setContact: (
    name: string,
    avatar_url: string,
    type: 'user' | 'group',
    login: string
  ) => void;
}

export function Groups({ contacts, setContact }: GroupsProps): JSX.Element {
  return (
    <Container>
      <h1>Groups</h1>

      <main>
        {contacts.map(contact => (
          <button
            type="button"
            key={contact.id}
            onClick={() =>
              setContact(
                contact.login,
                contact.avatar_url,
                'group',
                contact.login
              )
            }
          >
            <img src={contact.avatar_url} alt={contact.login} />

            <div>
              <strong>{contact.login}</strong>
              <p>Click to see messages!</p>
            </div>
          </button>
        ))}
      </main>
    </Container>
  );
}
