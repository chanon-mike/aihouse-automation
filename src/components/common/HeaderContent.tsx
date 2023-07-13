import { Link } from 'react-router-dom';

type HeaderContentProps = {
  isOpen: boolean;
};

const HeaderContent = ({ isOpen }: HeaderContentProps) => {
  return (
    <div
      className={`w-full flex-grow lg:justify-start lg:flex lg:w-auto ${
        isOpen ? 'flex' : 'hidden'
      }`}
    >
      <div className="flex lg:m-0 lg:flex-row lg:gap-6 flex-col gap-3 mt-4 text-light">
        <Link to="" className="md:flex hover:text-secondary">
          Request Form
        </Link>
        <Link to="" className="md:flex hover:text-secondary">
          Reservation
        </Link>
      </div>
    </div>
  );
};

export default HeaderContent;
