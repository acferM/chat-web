import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      blue: string;
      background: string;
      section: string;
      text: string;
      blue_shadow: string;
      shape: string;
      green: string;
    };

    fonts: {
      placeholder: string;
      section_title: string;
      contact_title: string;
      contact_message: string;
      chat_title: string;
      chat_status: string;
      message: string;
      message_time: string;
    };
  }
}
