import { useContext } from 'react';
import { ChatContext, ChatContextData } from '../contexts/chat';

export function useChat(): ChatContextData {
  const context = useContext(ChatContext);

  return context;
}
