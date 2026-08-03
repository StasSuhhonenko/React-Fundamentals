import { useState } from "react";
import type { ItemType } from "./types.ts";
import Logo from "./components/Logo.tsx";
import Form from "./components/Form.tsx";
import PackingList from "./components/PackingList.tsx";
import Stats from "./components/Stats.tsx";

/// Main Thread ///////////////////////////////////////////////
function App() {
  const [items, setItems] = useState<ItemType[]>([]);

  function handleAddItems(item: ItemType) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }
  function handleDeleteItemList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all the items?",
    );

    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onDeleteItemsList={handleDeleteItemList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
