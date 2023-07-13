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
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile information of an
              authenticated user.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <img src={user.picture} alt="Profile" className="profile__avatar" />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
