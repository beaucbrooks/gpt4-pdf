import { Document } from 'langchain/document';

export type Message = {
  type: 'apiMessage' | 'userMessage';
  message: string;
  isStreaming?: boolean;
  sourceDocs?: Document[];
};

export interface ChatPage {
  commonStrings: {
    headerText: string;
    initialAiMessage: string;
    defaultInputMessage: string;
    waitingOnResponseMessage: string;
  };
}