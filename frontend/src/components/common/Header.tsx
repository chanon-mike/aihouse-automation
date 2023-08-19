'use client';

import { useEffect, useState } from 'react';
import HeaderCollapse from './HeaderCollapse';
import HeaderContent from './HeaderContent';
import HeaderIcons from './HeaderIcons';
import HeaderContentItem from './HeaderContentItem';
import { usePathname } from 'next/navigation';

export type Navigation = {
  name: string;
  href: string;
  current: boolean;
};

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [navigation, setNavigation] = useState<Navigation[]>([
    { name: 'Request Form', href: '/', current: pathname === '/' },
    {
      name: 'Reservation',
      href: '/reservation',
      current: pathname === `/reservation/`,
    },
  ]);

  useEffect(() => {
    setNavigation([
      { name: 'Request Form', href: '/', current: pathname === '/' },
      {
        name: 'Reservation',
        href: '/reservation',
        current: pathname === `/reservation/`,
      },
    ]);
  }, [pathname]);

  return (
    <nav>
      <div className="fixed w-full z-20 top-0 left-0 bg-dark flex items-center justify-between flex-wrap sm:hidden mt-16">
        {/* Mobile menu, use isOpen to check if it is open or not, the nopen the collapse menu below for mobile */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } px-2 pt-2 pb-3 space-y-1 flex flex-col justify-start w-full`}
        >
          {navigation.map((item) => (
            <HeaderContentItem key={item.name} item={item} />
          ))}
        </div>
      </div>
      <div className="fixed w-full z-20 top-0 left-0 bg-dark flex items-center justify-between flex-wrap sm:p-4 max-sm:p-8">
        <HeaderCollapse isOpen={isOpen} setIsOpen={setIsOpen} />
        <HeaderContent navigation={navigation} />
        <HeaderIcons />
      </div>
    </nav>
  );
};

export default Header;
