import ListItem from "./ListItem";

const List = ({ title, list, onSelect, selectedItems, onTitleClick }) => {
  const handleSelect = (item) => {
    onSelect(item);
  };

  const sortList = () => {
    //Sort the list alphabetically
    const sortedList = [...list].sort()
    onTitleClick(sortedList)
  }
  return (
    <div className="list-container">
      <h2 onClick={sortList}>{title}</h2>
      {list.length === 0 ? (
        <p className="empty">The list has no items.</p>
      ) : (
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
      )}
    </div>
  );
};

export default List;
