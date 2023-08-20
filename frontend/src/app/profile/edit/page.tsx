import { userApi } from '@/libs/services/user';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
  async function Profile() {
    const session = await getSession();
    const user = await userApi.getUserById(session?.user?.sub ?? '', session?.accessToken ?? '');

    return (
      <form className="form-control text-neutral max-w-md w-full">
        <h1 className="text-3xl text-center mb-3">Edit Profile</h1>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          defaultValue={user.name}
          className="input input-bordered w-full"
        />
        <label className="label">
          <span className="label-text">Room Number</span>
        </label>
        <input
          type="text"
          placeholder="Room Number"
          defaultValue={user.room}
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-secondary mt-6">
          Edit
        </button>
      </form>
    );
  },
  { returnTo: '/profile/edit' },
);
