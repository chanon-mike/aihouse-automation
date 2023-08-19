import { MdLogin } from 'react-icons/md';

const LoginButton = () => {
  return (
    <a
      href="/api/auth/login"
      className="cursor-pointer flex flex-row justify-start items-center gap-2"
    >
      <MdLogin className="text-xl " />
      Login
    </a>
  );
};

export default LoginButton;
