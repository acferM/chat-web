import { Groups } from '../components/Groups';
import { Sidebar } from '../components/Sidebar';
import { Container } from '../styles/Chat';

export default function Chats(): JSX.Element {
  return (
    <Container>
      <Sidebar />

      <div>
        <Groups />
      </div>
    </Container>
  );
}
