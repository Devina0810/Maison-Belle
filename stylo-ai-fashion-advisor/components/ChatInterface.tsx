
import React, { useState, useRef, useEffect } from 'react';
import { Message, Role } from '../types';
import { sendMessageStream } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import UserInput from './UserInput';

const initialMessages: Message[] = [
  {
    id: 'init-1',
    role: Role.AI,
    content: "Welcome to Stylo Atelier. I can help you shape polished Maison Belle-inspired outfits.",
  },
  {
    id: 'init-2',
    role: Role.AI,
    content: "Share your mood, silhouette preference, and occasion. I will build a refined look direction with color, fabric, and accessorizing notes.",
  },
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);
    const userMessage: Message = { id: Date.now().toString(), role: Role.USER, content: text };
    
    // Add user message and a placeholder for AI's response
    setMessages(prev => [...prev, userMessage, { id: 'ai-response', role: Role.AI, content: '' }]);

    let fullResponse = '';
    try {
      const stream = sendMessageStream(text);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === 'ai-response' ? { ...msg, content: fullResponse } : msg
          )
        );
      }
    } catch (error) {
       console.error(error);
       setMessages(prev =>
        prev.map(msg =>
          msg.id === 'ai-response' ? { ...msg, content: 'Sorry, I encountered an error.' } : msg
        )
      );
    } finally {
      // Replace placeholder ID with a permanent one
      setMessages(prev =>
        prev.map(msg =>
          msg.id === 'ai-response' ? { ...msg, id: Date.now().toString() } : msg
        )
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-[#e9ded2] bg-white shadow-xl">
      <div className="bg-[#5e412f] px-5 py-4 text-white sm:px-6">
        <p className="font-editorial text-2xl sm:text-3xl">Stylo Fashion Advisor</p>
        <p className="text-sm text-[#e5d8c8]">Personal styling guidance for Maison Belle</p>
      </div>
      <div ref={chatContainerRef} className="flex-1 space-y-4 overflow-y-auto bg-[#fcf8f2] px-4 py-5 sm:px-6">
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isTyping={isLoading && index === messages.length - 1}
          />
        ))}
      </div>
      <UserInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
