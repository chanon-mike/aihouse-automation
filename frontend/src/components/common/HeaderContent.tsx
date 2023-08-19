'use client';

import type { Navigation } from './Header';
import HeaderContentItem from './HeaderContentItem';

type HeaderContentProps = {
  navigation: Navigation[];
};

const HeaderContent = ({ navigation }: HeaderContentProps) => {
  return (
    <>
      {/* Desktop menu */}
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <HeaderContentItem key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderContent;
