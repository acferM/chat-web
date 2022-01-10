import styled from 'styled-components';

export const Container = styled.aside`
  height: 100%;
  background: ${props => props.theme.colors.blue};
  width: 11.625rem;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2.375rem 0;

  img {
    aspect-ratio: 1/1;
    width: 6.25rem;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  nav {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    button {
      margin-left: 1.5rem;
      height: 5.5rem;
      border-radius: 1.25rem 0 0 1.25rem;
      border: 0;
      background: transparent;
      transition: background 0.2s;
      position: relative;

      &:hover {
        background: #004be1;
      }

      &.active {
        background: #004be1;

        &::after {
          content: '';
          position: absolute;
          top: -1px;
          right: 0;
          height: 5.625rem;
          width: 0.5rem;
          background: #ffe81a;
          border-radius: 1.5rem 0 0 1.5rem;
          box-shadow: -2px 0 4px rgba(0, 0, 0, 0.25);
        }
      }

      svg {
        color: ${props => props.theme.colors.text};
        margin-right: 1.5rem;
      }
    }
  }

  > button {
    border: 0;
    border-radius: 1.25rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    transition: background 0.2s;

    &:hover {
      background: #004be1;
    }

    svg {
      color: ${props => props.theme.colors.text};
    }
  }
`;
