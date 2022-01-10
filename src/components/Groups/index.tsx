import { Container } from './styles';

export function Groups(): JSX.Element {
  return (
    <Container>
      <h1>Groups</h1>

      <main>
        <button type="button">
          <img src="https://github.com/YuugenStudios.png" alt="YuugenStudios" />

          <div>
            <strong>YuugenStudios</strong>
            <p>Click to see messages!</p>
          </div>
        </button>
        <button type="button">
          <img src="https://github.com/YuugenStudios.png" alt="YuugenStudios" />

          <div>
            <strong>YuugenStudios</strong>
            <p>Click to see messages!</p>
          </div>
        </button>
      </main>
    </Container>
  );
}
