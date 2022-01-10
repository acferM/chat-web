import styled from 'styled-components';

export const Container = styled.div`
  width: 26.75rem;
  height: 100%;
  border-radius: 1.25rem;
  background: ${props => props.theme.colors.section};
  box-shadow: 0 4px 4px ${props => props.theme.colors.blue_shadow};
  padding: 0.875rem 1.25rem;

  h1 {
    color: ${props => props.theme.colors.text};
    ${props => props.theme.fonts.section_title};
  }

  main {
    margin-top: 1rem;
    width: 100%;

    button {
      width: 100%;
      display: flex;
      align-items: center;
      background: transparent;
      border: 0;
      padding: 0.875rem 0.25rem;
      gap: 1rem;
      transition: background 0.2s;

      &:hover {
        background: #212121;
      }

      & + button {
        border-top: 1px solid rgba(255, 255, 255, 0.25);
      }

      img {
        aspect-ratio: 1;
        width: 4.375rem;
        border-radius: 50%;
      }

      div {
        text-align: left;
        color: ${props => props.theme.colors.text};

        strong {
          ${props => props.theme.fonts.contact_title};
        }

        p {
          ${props => props.theme.fonts.contact_message};
          opacity: 0.75;
        }
      }
    }
  }
`;
