import { FaUserCircle } from 'react-icons/fa';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { userApi } from '@/libs/services/user';
import Link from 'next/link';
import type { User } from '@/types/user';
import ProfileError from '@/components/profile/ProfileError';

export default withPageAuthRequired(
  async function Profile() {
    const session = await getSession();
    if (!session) {
      return <div>Something went wrong. Please login and access again</div>;
    }

    const user = await userApi.getUserById(session.user.sub, session.accessToken ?? '');
    if (!user) {
      const data: User = {
        id: session.user.sub,
        email: session.user.email,
        name: session.user.name,
        room: '',
        reservations: [],
      };

      return <ProfileError data={data} />;
    }

    return (
      <div className="hero text-neutral max-w-2xl">
        <div className="hero-content flex-col lg:flex-row">
          <FaUserCircle size={200} />
          <div className="ml-10">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <h2 className="text-lg">Room: {user.room}</h2>
            <Link href="/profile/edit">
              <button className="btn btn-secondary mt-3">Edit</button>
            </Link>
          </div>
        </div>
      </div>
    );
  },
  { returnTo: '/profile' },
);
