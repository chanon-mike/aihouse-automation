import { useAuth0 } from '@auth0/auth0-react';
import { MdLogout } from 'react-icons/md';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    const ok = confirm('ログアウトしますか?\nDo you want to logout?');
    if (ok) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleLogout}>
      <MdLogout className="text-2xl text-light hover:text-secondary" />
    </div>
  );
};

export default LogoutButton;
