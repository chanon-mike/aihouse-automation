import { useAuth0 } from '@auth0/auth0-react';
import { MdLogin } from 'react-icons/md';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="cursor-pointer" onClick={() => loginWithRedirect()}>
      <MdLogin className="text-2xl text-light hover:text-secondary" />
    </div>
  );
};

export default LoginButton;
