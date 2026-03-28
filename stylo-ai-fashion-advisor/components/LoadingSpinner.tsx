
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center gap-1.5 py-1">
    <div className="typing-dot h-2 w-2 rounded-full bg-[#5e412f]" style={{ animationDelay: '0s' }}></div>
    <div className="typing-dot h-2 w-2 rounded-full bg-[#5e412f]" style={{ animationDelay: '0.12s' }}></div>
    <div className="typing-dot h-2 w-2 rounded-full bg-[#5e412f]" style={{ animationDelay: '0.24s' }}></div>
  </div>
);

export default LoadingSpinner;
