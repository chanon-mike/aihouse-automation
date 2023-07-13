import { Navigation } from './Header';

type HeaderContentItemProps = {
  item: Navigation;
  handleOnClick: (item: Navigation) => void;
};

const HeaderContentItem = ({ item, handleOnClick }: HeaderContentItemProps) => {
  return (
    <a
      key={item.name}
      href={item.href}
      className={`
                  ${
                    item.current
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                  }
                  rounded-md px-3 py-2 text-sm font-medium
                `}
      onClick={() => handleOnClick(item)}
    >
      {item.name}
    </a>
  );
};

export default HeaderContentItem;
