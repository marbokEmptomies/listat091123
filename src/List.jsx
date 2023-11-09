import ListItem from "./ListItem";

const List = ({ title, list, onSelect, selectedItems }) => {
    const handleSelect = (item) => {
        onSelect(item)
    }
  return (
    <div className="list-container">
      <h2>{title}</h2>
      <ul>
        {list.map((item) => (
          <ListItem
            key={item}
            item={item}
            onSelect={handleSelect}
            isSelected={selectedItems.includes(item)}
          />
        ))}
      </ul>
    </div>
  );
};

export default List;
