import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../common/Loading';
import { ComponentType } from 'react';

type AuthenticationGuardProps = {
  component: ComponentType;
};

export const AuthenticationGuard = ({ component }: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Loading />,
  });

  return <Component />;
};
