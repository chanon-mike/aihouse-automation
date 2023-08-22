'use client';

import { userApi } from '@/libs/api/user';
import type { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ProfileErrorProps = { data: User };

const ProfileError = ({ data }: ProfileErrorProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    await userApi.createUser(data);
    router.push('/profile/edit');
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-cente text-center">
      {loading ? (
        <span className="loading" />
      ) : (
        <>
          <h2>エラーが発生したため、プロフィールを作成してください</h2>
          <h2>Something went wrong. Please create an profile.</h2>
          <button className="btn btn-warning mt-6" onClick={handleSubmit}>
            <span>Create Profile</span>
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileError;
