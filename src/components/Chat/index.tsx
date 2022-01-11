/* eslint-disable jsx-a11y/label-has-associated-control */
import { FiSmile } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';

import { Container } from './styles';

export function Chat(): JSX.Element {
  return (
    <Container>
      <header>
        <img src="https://github.com/acferlucas.png" alt="acferlucas" />

        <div>
          <h1>acferlucas</h1>
          <p>Online</p>
        </div>
      </header>

      <main>
        <article>
          <div>Hey There!</div>
          <p>Today, 2:01pm</p>
        </article>

        <article>
          <div>How are you doing?</div>
          <p>Today, 2:02pm</p>
        </article>

        <article className="sent">
          <div>Hello...</div>
          <p>Today, 2:12pm</p>
        </article>

        <article className="sent">
          <div>I am good and how about you?</div>
          <p>Today, 2:12pm</p>
        </article>

        <article>
          <div>I am doing well. Can we meet up tomorrow?</div>
          <p>Today, 2:13pm</p>
        </article>

        <article className="sent">
          <div>Sure!</div>
          <p>Today, 2:14pm</p>
        </article>
      </main>

      <footer>
        <label>
          <input type="text" placeholder="Type your message" />

          <button type="submit">
            <FiSmile size={20} />
          </button>
        </label>

        <button type="button">
          <RiSendPlaneFill size={25} />
        </button>
      </footer>
    </Container>
  );
}
