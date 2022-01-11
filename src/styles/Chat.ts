import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  padding: 2.1875rem 2rem;
  display: flex;
  justify-content: space-between;
  gap: 2.8125rem;

  > section {
    width: calc(50% - 5.8125rem);
    display: flex;
    flex-direction: column;
    gap: 2.75rem;

    label {
      width: 100%;
      height: 3.75rem;
      border-radius: 1.25rem;
      background: ${props => props.theme.colors.section};
      display: flex;
      align-items: center;
      gap: 2.25rem;
      padding: 0 1.25rem;
      box-shadow: 0px 4px 4px ${props => props.theme.colors.blue_shadow};

      input {
        background: transparent;
        border: 0;
        ${props => props.theme.fonts.placeholder};
        color: ${props => props.theme.colors.text};

        input::placeholder {
          color: ${props => props.theme.colors.text};
          opacity: 0.35;
        }
      }
    }
  }
`;
