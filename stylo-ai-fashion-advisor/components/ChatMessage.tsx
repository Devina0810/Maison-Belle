import React from 'react';
import { Message, Role } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

const AiAvatar: React.FC = () => (
  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#5e412f]" aria-hidden="true">
    <span className="font-editorial text-lg font-semibold text-white">S</span>
  </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping = false }) => {
  const isUser = message.role === Role.USER;

  const wrapperClasses = `reveal-rise flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`;
  const bubbleClasses = `max-w-lg break-words rounded-lg px-4 py-3 lg:max-w-xl ${
    isUser
      ? 'bg-[#5e412f] text-white'
      : 'border border-[#e9ded2] bg-[#f5f0e8] text-[#5e412f]'
  }`;

  const renderContent = () => {
    if (isTyping && message.content === '') {
      return <LoadingSpinner />;
    }
    // Simple markdown for bolding and newlines to improve readability.
    const formattedContent = message.content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
    return (
      <div
        className="max-w-none text-base leading-relaxed text-inherit [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    );
  };

  return (
    <div className={wrapperClasses}>
      {!isUser && <AiAvatar />}
      <div className={bubbleClasses}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatMessage;