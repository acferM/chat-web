import styled from 'styled-components';

export const Container = styled.div`
  width: calc(50% - 5.8125rem);
  height: 100%;
  background: ${props => props.theme.colors.section};
  border-radius: 1.25rem;
  box-shadow: 0 4px 4px ${props => props.theme.colors.blue_shadow};
  padding: 0 1.75rem;

  header {
    padding: 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 2.125rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);

    img {
      aspect-ratio: 1;
      width: 4.6875rem;
      border-radius: 50%;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }

    div {
      color: ${props => props.theme.colors.text};

      h1 {
        ${props => props.theme.fonts.chat_title};
      }

      p {
        ${props => props.theme.fonts.chat_status};
        opacity: 0.85;
      }
    }
  }

  main {
    margin-top: 1rem;
    height: calc(100% - 15.875rem);

    article {
      color: ${props => props.theme.colors.text};
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      & + article {
        margin-top: 1.875rem;
      }

      &.sent {
        align-items: flex-end;

        div {
          background: ${props => props.theme.colors.blue};
        }
      }

      div {
        width: min-content;
        max-width: 70%;
        padding: 0.75rem 2.625rem;
        background: ${props => props.theme.colors.shape};
        white-space: pre;
        ${props => props.theme.fonts.message};
        border-radius: 0.625rem;
      }

      p {
        opacity: 0.25;
        ${props => props.theme.fonts.message_time};
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 2.125rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.25);

    label {
      width: 100%;
      background: ${props => props.theme.colors.shape};
      height: 2.8125rem;
      border-radius: 0.625rem;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      input {
        height: 100%;
        width: 100%;
        background: transparent;
        border: 0;
        ${props => props.theme.fonts.message};
        color: ${props => props.theme.colors.text};

        &:focus {
          outline: none;
        }
      }

      button {
        background: transparent;
        border: 0;

        svg {
          color: ${props => props.theme.colors.text};
          opacity: 0.5;
        }
      }
    }

    > button {
      aspect-ratio: 1;
      width: 2.8125rem;
      border: 0;
      border-radius: 0.625rem;
      background: ${props => props.theme.colors.blue};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
