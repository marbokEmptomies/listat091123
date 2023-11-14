import ListItem from "./ListItem";

const List = ({ title, list, onSelect, selectedItems, onTitleClick }) => {
  const handleSelect = (item) => {
    onSelect(item);
  };

  const sortList = () => {
    // Sort the list alphabetically
    const sortedList = [...list.items].sort((a, b) => a.localeCompare(b));
    // Switch between ascending and descending sorting 
    const sortOrder = list.sortOrder === 'asc' ? 'desc' : 'asc';
    onTitleClick({ items: sortOrder === 'asc' ? sortedList : sortedList.reverse(), sortOrder });
    console.log("Sort order: ", sortOrder)
  };
  
  return (
    <div className="list-container">
      <h2 onClick={sortList}>{title}</h2>
      {list.items.length === 0 ? (
        <p className="empty">The list has no items.</p>
      ) : (
        <ul>
          {list.items.map((item) => (
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
