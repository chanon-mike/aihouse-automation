'use client';

import type { Navigation } from './Header';
import Link from 'next/link';

type HeaderContentItemProps = {
  item: Navigation;
};

const HeaderContentItem = ({ item }: HeaderContentItemProps) => {
  return (
    <Link
      key={item.name}
      href={`${item.href}`}
      className={`
                  ${
                    item.current
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                  }
                  rounded-md px-3 py-2 text-sm font-medium
                `}
    >
      {item.name}
    </Link>
  );
};

export default HeaderContentItem;
