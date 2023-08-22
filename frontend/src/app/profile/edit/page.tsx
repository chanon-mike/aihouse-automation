import ProfileEdit from '@/components/profile/ProfileEdit';
import { userApi } from '@/libs/api/user';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
  async function Profile() {
    const session = await getSession();
    const user = await userApi.getUserById(session?.user?.sub ?? '', session?.accessToken ?? '');

    if (!user) {
      return <div>Something went wrong</div>;
    }

    return <ProfileEdit accessToken={session?.accessToken ?? ''} user={user} />;
  },
  { returnTo: '/profile/edit' },
);
