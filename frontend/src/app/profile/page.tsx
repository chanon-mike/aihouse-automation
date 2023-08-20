import { FaUserCircle } from 'react-icons/fa';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { userApi } from '@/libs/services/user';
import Link from 'next/link';

export default withPageAuthRequired(
  async function Profile() {
    const session = await getSession();
    const user = await userApi.getUserById(session?.user?.sub ?? '', session?.accessToken ?? '');

    return (
      <div className="hero text-neutral max-w-2xl">
        <div className="hero-content flex-col lg:flex-row">
          <FaUserCircle size={300} />
          <div className="ml-10">
            <h1 className="text-3xl font-bold">{user.name}</h1>
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
