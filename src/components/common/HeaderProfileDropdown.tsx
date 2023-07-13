import { MdPerson } from 'react-icons/md';
import LogoutButton from '../auth/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../auth/LoginButton';

const HeaderProfileDropdown = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <ul className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {isAuthenticated ? (
          <div>
            <li>
              <a
                href="#"
                className="px-4 py-2 text-sm text-gray-700 flex flex-row items-center flex-start gap-2"
              >
                <MdPerson className="text-lg" />
                Your Profile
              </a>
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
    </div>
  );
};

export default HeaderProfileDropdown;
