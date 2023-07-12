import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../Loading';
import React from 'react';

type AuthenticationGuardProps = {
  component: React.ComponentType;
};

export const AuthenticationGuard = ({ component }: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <Loading />
      </div>
    ),
  });

  return <Component />;
};
