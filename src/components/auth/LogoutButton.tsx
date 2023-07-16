import { useAuth0 } from '@auth0/auth0-react';
import { MdLogout } from 'react-icons/md';
import { redirectUri } from '../../utils/envValues';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    const ok = confirm('ログアウトしますか?\nDo you want to logout?');
    if (ok) {
      logout({ logoutParams: { returnTo: redirectUri } });
    }
  };

  return (
    <div
      className="cursor-pointer flex flex-row justify-start items-center gap-2"
      onClick={handleLogout}
    >
      <MdLogout className="text-xl " />
      Logout
    </div>
  );
};

export default LogoutButton;
