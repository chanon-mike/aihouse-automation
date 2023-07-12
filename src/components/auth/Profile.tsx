import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../common/Loading';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const handleLogin = () => {
    const ok = confirm('ログアウトしますか?\nDo you want to logout?');
    if (ok) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated && user ? (
    <div className="cursor-pointer" onClick={handleLogin}>
      <img className="rounded-full w-8 aspect-square" src={user.picture} alt={user.name} />
    </div>
  ) : (
    <div className="cursor-pointer" onClick={() => loginWithRedirect()}>
      <FaUserCircle className="text-3xl text-light hover:text-secondary" />
    </div>
  );
};

export default Profile;
