'use client';

import type { Dispatch, SetStateAction } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

type HeaderCollapseProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const HeaderCollapse = ({ isOpen, setIsOpen }: HeaderCollapseProps) => {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md p-2 ml-4 text-base-100 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      >
        {!isOpen ? (
          <FaBars className=" fill-current text-lg" />
        ) : (
          <IoMdClose className="fill-current text-lg" />
        )}
      </button>
    </div>
  );
};

export default HeaderCollapse;
