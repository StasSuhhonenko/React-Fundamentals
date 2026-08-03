import { useState } from "react";
import type { ItemType } from "../types.ts";
import Item from "./Item.tsx";

function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onDeleteItemsList,
}: {
  items: ItemType[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onDeleteItemsList: () => void;
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by the input order</option>
          <option value="desciption">Sort by the description</option>
          <option value="packed">Sort by the packed status</option>
        </select>
        <button onClick={onDeleteItemsList}>Clear List</button>
      </div>
    </div>
  );
}

export default PackingList;
