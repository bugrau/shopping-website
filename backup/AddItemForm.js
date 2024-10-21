import React, { useState } from 'react';

function AddItemForm({ onAddItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddItem({ name, quantity });
      setName('');
      setQuantity(1);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min="1"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;
