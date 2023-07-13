import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

const AuthSettings = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated && user ? <LogoutButton /> : <LoginButton />;
};

export default AuthSettings;
