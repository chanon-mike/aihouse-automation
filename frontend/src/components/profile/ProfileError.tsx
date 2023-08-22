'use client';

import { userApi } from '@/libs/api/user';
import type { User } from '@/types/user';
import { useRouter } from 'next/navigation';

type ProfileErrorProps = { data: User };

const ProfileError = ({ data }: ProfileErrorProps) => {
  const router = useRouter();
  const handleSubmit = async () => {
    await userApi.createUser(data);
    router.push('/profile/edit');
  };

  return (
    <div className="flex flex-col justify-center items-cente text-center">
      <h2>エラーが発生したため、プロフィールを作成してください</h2>
      <h2>Something went wrong. Please create an profile.</h2>
      <button className="btn btn-warning mt-6" onClick={handleSubmit}>
        Create Profile
      </button>
    </div>
  );
};

export default ProfileError;
