import { BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Profile from '../auth/Profile';

const HeaderIcons = () => {
  return (
    <div className="text-light flex flex-row gap-4 items-center">
      <Link
        to="https://github.com/chanon-mike/aihouse-automation"
        className="md:flex hover:text-secondary"
      >
        <BsGithub className="text-xl" />
      </Link>
      <Profile />
    </div>
  );
};

export default HeaderIcons;
