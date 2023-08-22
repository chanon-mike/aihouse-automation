import type { RefObject } from 'react';
import { BsXCircleFill } from 'react-icons/bs';

type FailureModalProps = {
  modalRef: RefObject<HTMLDialogElement>;
  message: string;
};

const FailureModal = ({ modalRef, message }: FailureModalProps) => {
  return (
    <dialog className="modal" ref={modalRef}>
      <form method="dialog" className="modal-box text-center">
        <BsXCircleFill className="mx-auto text-5xl mb-4 text-error" />
        <p>{message}</p>
        <div className="modal-action flex items-center justify-center">
          <button className="btn btn-error">Close</button>
        </div>
      </form>
    </dialog>
  );
};

export default FailureModal;
