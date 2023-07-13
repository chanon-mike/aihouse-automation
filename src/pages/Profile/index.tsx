import { useAuth0 } from '@auth0/auth0-react';
import PageLayout from '../../components/common/PageLayout';
import Loading from '../../components/common/Loading';

const Profile = () => {
  const { user } = useAuth0();

  if (!user) {
    return <Loading />;
  }

  return (
    <PageLayout>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-dark text-xl font-semibold">Profile</h1>
        <h1 className="text-dark text-4xl font-bold">プロフィール</h1>
        <div className="flex flex-row p-4 justify-between gap-5">
          <img src={user.picture} alt="Profile" className="rounded-full" />
          <div className="flex flex-col gap-5 p-5 justify-start">
            <h2 className="text-2xl">{user.name}</h2>
            <span className="profile__description">{user.email}</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
