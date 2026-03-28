
import React from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="flex h-screen flex-col text-[#5e412f] antialiased font-[Cormorant_Garamond]">
      <Header />
      <main className="flex min-h-0 flex-shrink flex-grow px-4 pb-4 pt-24 sm:px-6 sm:pb-6 lg:px-10">
        <div className="reveal-rise h-full w-full max-w-4xl mx-auto">
          <ChatInterface />
        </div>
      </main>
    </div>
  );
};

export default App;
