import { MdLogout } from 'react-icons/md';

const LogoutButton = () => {
  return (
    <a
      href="/api/auth/logout"
      className="cursor-pointer flex flex-row justify-start items-center gap-2"
    >
      <MdLogout className="text-xl " />
      Logout
    </a>
  );
};

export default LogoutButton;
