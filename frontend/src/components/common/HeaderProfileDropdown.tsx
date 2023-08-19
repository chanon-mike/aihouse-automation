import { MdPerson } from 'react-icons/md';
// import { baseUrl } from '../../pages/pagesData';

import { useAtom } from 'jotai';
import { sessionAtom } from '@/atoms/session';
import Link from 'next/link';
import LogoutButton from '@/components/auth/LogoutButton';
import LoginButton from '@/components/auth/LoginButton';

const HeaderProfileDropdown = () => {
  const [session] = useAtom(sessionAtom);

  return (
    <ul className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      {session?.user ? (
        <div>
          <li>
            <Link
              href={`/profile`}
              className="px-4 py-2 text-sm text-gray-700 flex flex-row items-center flex-start gap-2"
            >
              <MdPerson className="text-lg" />
              Your Profile
            </Link>
          </li>
          <li>
            <div className="px-4 py-2 text-sm text-gray-700">
              <LogoutButton />
            </div>
          </li>
        </div>
      ) : (
        <li>
          <div className="px-4 py-2 text-sm text-gray-700">
            <LoginButton />
          </div>
        </li>
      )}
    </ul>
  );
};

export default HeaderProfileDropdown;
