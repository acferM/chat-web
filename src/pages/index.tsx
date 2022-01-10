import { useRouter } from 'next/router';
import { Container } from '../styles/Home';

export default function Home(): JSX.Element {
  const router = useRouter();

  const handleSignIn = (): void => {
    router.push('/chats');
  };

  return (
    <Container>
      <main>
        <h1>React Messages</h1>

        <button onClick={handleSignIn} type="button">
          SignIn
        </button>
      </main>
    </Container>
  );
}
