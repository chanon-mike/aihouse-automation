'use client';

import { BsGithub } from 'react-icons/bs';
import { MdPerson, MdSettings } from 'react-icons/md';
import Link from 'next/link';
import LoginButton from '../auth/LoginButton';
import LogoutButton from '../auth/LogoutButton';
import { useUser } from '@auth0/nextjs-auth0/client';

const HeaderProfileDropdown = () => {
  const { user } = useUser();

  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu z-[1] p-2 shadow rounded-box mt-4 w-48 bg-white py-2 text-neutral text-sm"
    >
      {user ? (
        <>
          <li>
            <Link href={`/profile`} className="flex flex-row items-center flex-start gap-2">
              <MdPerson className="text-lg" />
              Your Profile
            </Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </>
      ) : (
        <li>
          <LoginButton />
        </li>
      )}
    </ul>
  );
};

const HeaderIcons = () => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 ">
      <div className="relative ml-3">
        <div className="mr-4 gap-4 cursor-pointer flex rounded-full text-base-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
          <Link
            href="https://github.com/chanon-mike/aihouse-automation"
            className="md:flex hover:text-secondary"
          >
            <BsGithub className="text-2xl" />
          </Link>
          <div className="dropdown dropdown-end">
            <MdSettings tabIndex={0} className="text-2xl" />
            <HeaderProfileDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderIcons;
