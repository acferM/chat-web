import { signIn } from 'next-auth/react';

import { Container } from '../styles/Home';

export default function Home(): JSX.Element {
  const handleSignIn = (): void => {
    signIn('github');
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
