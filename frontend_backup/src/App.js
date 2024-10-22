import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, addItem, updateItem, deleteItem } from './redux/shoppingListSlice';
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';

function App() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.shoppingList);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleToggleItem = (item) => {
    dispatch(updateItem({ ...item, purchased: !item.purchased }));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Shopping List</h1>
      <AddItemForm onAddItem={handleAddItem} />
      <ShoppingList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default App;
