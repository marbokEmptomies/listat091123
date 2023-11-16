import { useEffect, useRef } from "react";

const ListItem = ({ index, item, onSelect, isSelected }) => {
  const listItemRef = useRef();

  useEffect(() => {
    if (isSelected) {
      listItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isSelected]);

  return (
    <div>
      <li
        ref={listItemRef}
        className={`list-item ${isSelected ? "selected" : ""}`}
        onClick={() => onSelect(item)}
      >
        {item} 
      </li>
    </div>
  );
};

export default ListItem;
