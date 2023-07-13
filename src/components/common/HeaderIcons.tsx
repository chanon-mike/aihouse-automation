import { BsGithub } from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import HeaderProfileDropdown from './HeaderProfileDropdown';

const HeaderIcons = () => {
  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 ">
      <div className="relative ml-3">
        <div className="mr-4 gap-4 cursor-pointer flex rounded-full text-light text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
          <Link
            to="https://github.com/chanon-mike/aihouse-automation"
            className="md:flex hover:text-secondary"
          >
            <BsGithub className="text-2xl" />
          </Link>
          <div onClick={handleDropDown}>
            <MdSettings className="text-2xl" />
          </div>
        </div>
        {dropDown && <HeaderProfileDropdown />}
      </div>
    </div>
  );
};

export default HeaderIcons;
