import React from 'react';
import { ChatMessage, MessageSender } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';
import SectionList from './SectionList';
import ContentDisplay from './ContentDisplay';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface ChatMessageProps {
  message: ChatMessage;
  onSectionSelect: (section: string, topic: string) => void;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message, onSectionSelect }) => {
  const { sender, content, topic } = message;
  const isUser = sender === MessageSender.USER;

  const renderContent = () => {
    if (typeof content === 'string') {
      if (content.includes("...")) {
         return <div className="flex items-center space-x-2"><LoadingSpinner /><p>{content}</p></div>
      }
      return <p className="whitespace-pre-wrap">{content}</p>;
    }
    if ('sections' in content) {
      return (
        <div>
          <p className="mb-3">Here are 10 key sections for "{topic}". Click one to generate a lesson plan and interview questions.</p>
          <SectionList sections={content.sections} onSelect={(section) => onSectionSelect(section, topic || '')} />
        </div>
      );
    }
    if ('content' in content) {
      return <ContentDisplay content={content.content} topic={topic || ''} />;
    }
    return null;
  };

  const Icon = isUser ? UserIcon : BotIcon;
  const bgColor = isUser ? 'bg-sky-600' : 'bg-slate-800';
  const alignment = isUser ? 'justify-end' : 'justify-start';
  const messageRadius = isUser ? 'rounded-l-2xl rounded-tr-2xl' : 'rounded-r-2xl rounded-tl-2xl';

  return (
    <div className={`flex items-start gap-3 w-full max-w-4xl mx-auto ${alignment}`}>
      {!isUser && (
        <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-teal-400 to-sky-600 rounded-full flex items-center justify-center shadow-lg">
          <Icon />
        </div>
      )}
      <div className={`px-5 py-4 ${bgColor} ${messageRadius} shadow-md max-w-[85%]`}>
        {renderContent()}
      </div>
      {isUser && (
        <div className="w-10 h-10 flex-shrink-0 bg-slate-700 rounded-full flex items-center justify-center shadow-lg">
          <Icon />
        </div>
      )}
    </div>
  );
};

export default ChatMessageComponent;