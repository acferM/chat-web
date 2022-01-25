import { createContext, useCallback, useState } from 'react';

export type ChatContextData = {
  chatId: string;
  updateChat: (chatId: string) => void;
};

interface ChatContextProviderProps {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export function ChatContextProvider({
  children,
}: ChatContextProviderProps): JSX.Element {
  const [chatId, setChatId] = useState('');

  const updateChat = useCallback((chat_id: string) => {
    setChatId(chat_id);
  }, []);

  return (
    <ChatContext.Provider value={{ chatId, updateChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext };
