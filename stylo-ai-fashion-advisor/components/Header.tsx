
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-30 border-b border-[#dfd2c0] bg-[#e8e0d4]">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5e412f] text-white">
            <span className="font-editorial text-xl font-semibold">S</span>
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-wide text-[#5e412f]">Maison Belle</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
