import { useState } from 'react';
import HeaderCollapse from './HeaderCollapse';
import HeaderContent from './HeaderContent';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed w-full z-20 top-0 left-0 bg-dark flex items-center justify-between flex-wrap p-4 lg:px-20">
      <a href={window.location.origin} className="flex items-center">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-light hover:text-secondary">
          AI-House
        </span>
      </a>
      <HeaderCollapse isOpen={isOpen} setIsOpen={setIsOpen} />
      <HeaderContent isOpen={isOpen} />
    </nav>
  );
};

export default Header;
