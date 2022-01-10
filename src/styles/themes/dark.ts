import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  title: 'dark',

  colors: {
    background: '#303030',
    blue: '#1A66FF',
    blue_shadow: 'rgba(0, 209, 255, .25)',
    green: '#00FF75',
    section: '#0D0D0D',
    text: '#FFFFFF',
    shape: '#1B1B1B',
  },

  fonts: {
    chat_status: `
      font-family: Poppins;
      font-size: 0.875rem;
    `,
    chat_title: `
      font-family: Poppins;
      font-weight: 600;
      font-size: 1.5rem;
    `,
    contact_message: `
      font-family: Poppins;
      font-weight: 500;
      font-size: 0.875rem;
    `,
    contact_title: `
      font-family: Poppins;
      font-weight: 600;
      font-size: 1.125rem;
    `,
    message: `
      font-family: Poppins;
      font-weight: 500;
      font-size: 1rem;
    `,
    message_time: `
      font-family: Poppins;
      font-weight: 500;
      font-size: 0.75rem;
    `,
    placeholder: `
      font-family: Poppins;
      font-weight: 500;
      font-size: 1rem;
    `,
    section_title: `
      font-family: Poppins;
      font-weight: 600;
      font-size: 1.25rem;
    `,
  },
};

export { darkTheme };
