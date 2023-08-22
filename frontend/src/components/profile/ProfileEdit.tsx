'use client';

import { userApi } from '@/libs/api/user';
import type { User } from '@/types/user';
import { useRef, useState } from 'react';
import SuccessModal from '../common/SuccessModal';

type ProfileEditProps = {
  accessToken: string;
  user: User;
};

const ProfileEdit = ({ accessToken, user }: ProfileEditProps) => {
  const successModal = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState<User>(user);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await userApi.updateUser(user.id, accessToken, newUser);
    successModal.current?.showModal();

    setLoading(false);
  };

  return (
    <>
      <form className="form-control text-neutral max-w-md w-full" onSubmit={handleOnSubmit}>
        <h1 className="text-3xl text-center mb-3">Edit Profile</h1>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          defaultValue={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="input input-bordered w-full"
          required
        />
        <label className="label">
          <span className="label-text">Room Number</span>
        </label>
        <input
          type="text"
          placeholder="Room Number"
          defaultValue={newUser.room}
          onChange={(e) => setNewUser({ ...newUser, room: e.target.value })}
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className={`btn btn-secondary mt-6 ${loading && 'btn-disabled'}`}>
          {loading ? <span className="loading" /> : <span>Edit</span>}
        </button>
      </form>
      <SuccessModal
        modalRef={successModal}
        message="Successfully save user profile"
        returnMessage="Return to Profile"
        returnHref="/profile"
      />
    </>
  );
};

export default ProfileEdit;
