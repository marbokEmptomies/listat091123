import { useState } from "react";

const ListItem = ({ item, onSelect, isSelected }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div>
      <li
        className={`list-item ${isSelected ? 'selected' : ''} ${isFocused ? 'focused' : ''}`}
        onClick={() => onSelect(item)}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        tabIndex="0"
      >
        {item}
      </li>
    </div>
  );
};

export default ListItem;