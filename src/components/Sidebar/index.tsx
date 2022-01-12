import React from 'react';
import { VscHome } from 'react-icons/vsc';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';

import { signOut, useSession } from 'next-auth/react';
import { Container } from './styles';

export function Sidebar(): JSX.Element {
  const { data: session } = useSession();

  return (
    <Container>
      <img src={session?.user?.image} alt={session?.user?.name} />

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

      <button type="button" onClick={() => signOut()}>
        <GoSignOut size={50} />
      </button>
    </Container>
  );
}
