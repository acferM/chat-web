import React from 'react';
import { VscHome } from 'react-icons/vsc';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';

import { Container } from './styles';

export function Sidebar(): JSX.Element {
  return (
    <Container>
      <img src="https://github.com/acferM.png" alt="acferM" />

      <nav>
        <button type="button">
          <VscHome size={50} />
        </button>

        <button type="button" className="active">
          <BsFillChatDotsFill size={50} />
        </button>

        <button type="button">
          <IoIosNotificationsOutline size={50} />
        </button>

        <button type="button">
          <FiSettings size={50} />
        </button>
      </nav>

      <button type="button">
        <GoSignOut size={50} />
      </button>
    </Container>
  );
}
