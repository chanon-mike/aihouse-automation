import { useState } from 'react';
import HeaderCollapse from './HeaderCollapse';
import HeaderContent from './HeaderContent';
import HeaderIcons from './HeaderIcons';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed w-full z-20 top-0 left-0 bg-dark flex items-center justify-between flex-wrap p-4 lg:px-20">
      <HeaderCollapse isOpen={isOpen} setIsOpen={setIsOpen} />
      <HeaderContent isOpen={isOpen} />
      <HeaderIcons />
    </nav>
  );
};

export default Header;
