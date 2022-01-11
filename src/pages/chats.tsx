/* eslint-disable jsx-a11y/label-has-associated-control */
import { FiSearch } from 'react-icons/fi';
import { Chat } from '../components/Chat';

import { Contacts } from '../components/Contacts';
import { Sidebar } from '../components/Sidebar';

import { Container } from '../styles/Chat';

export default function Chats(): JSX.Element {
  return (
    <Container>
      <Sidebar />

      <section>
        <label>
          <FiSearch size={24} color="#fff" />
          <input type="text" placeholder="Pesquisar" />
        </label>

        <Contacts />

        <Contacts />
      </section>

      <Chat />
    </Container>
  );
}
