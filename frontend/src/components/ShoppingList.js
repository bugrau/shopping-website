import React from 'react';

function ShoppingList({ items, onToggleItem, onDeleteItem }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={item.purchased}
            onChange={() => onToggleItem(item)}
          />
          {item.name} - Quantity: {item.quantity}
          <button onClick={() => onDeleteItem(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ShoppingList;
