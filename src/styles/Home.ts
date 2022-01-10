import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  main {
    background: ${props => props.theme.colors.section};
    padding: 4rem;
    border-radius: 1.25rem;
    box-shadow: 0 4px 4px ${props => props.theme.colors.blue_shadow};
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h1 {
      font-size: 3rem;
      font-family: Poppins;
      color: ${props => props.theme.colors.text};
    }

    button {
      height: 4rem;
      border-radius: 10px;
      border: 0;
      background: ${props => props.theme.colors.blue};
      ${props => props.theme.fonts.chat_title};
      color: ${props => props.theme.colors.text};
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`;
