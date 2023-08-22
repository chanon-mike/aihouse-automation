import { useRouter } from 'next/navigation';
import type { RefObject } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

type SuccessModalProps = {
  modalRef: RefObject<HTMLDialogElement>;
  message: string;
  returnMessage: string;
  returnHref?: string;
};

const SuccessModal = ({ modalRef, message, returnMessage, returnHref }: SuccessModalProps) => {
  const router = useRouter();

  const handleReturnToProfile = () => {
    if (returnHref !== undefined) {
      router.push(returnHref);
      router.refresh();
    }
  };

  return (
    <dialog className="modal" ref={modalRef}>
      <form method="dialog" className="modal-box text-center">
        <BsCheckCircleFill className="mx-auto text-5xl mb-4" />
        <p>{message}</p>
        <div className="modal-action flex items-center justify-center">
          {returnHref !== undefined && (
            <button className="btn btn-success" onClick={handleReturnToProfile}>
              {returnMessage}
            </button>
          )}
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
};

export default SuccessModal;
