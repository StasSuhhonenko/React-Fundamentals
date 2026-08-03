import { useState } from "react";
import type { ItemType } from "../types.ts";

function Form({ onAddItems }: { onAddItems: (item: ItemType) => void }) {
  const [selection, setSelection] = useState(2);
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!description) return;

    const newItem: ItemType = {
      description,
      quantity: selection,
      packed: false,
      id: Date.now(),
    };

    console.log(newItem);

    onAddItems(newItem);
    setDescription("");
    setSelection(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={selection} onChange={(e) => setSelection(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
export default Form;
