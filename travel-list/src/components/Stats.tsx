import type { ItemType } from "../types.tsx";

function Stats({ items }: { items: ItemType[] }) {
  if (!items.length)
    return (
      <p className="footer">
        <em>Start adding some items to your packing list!</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer>
      <em>
        {percentage === 100
          ? "You've packed everything, safe travels!"
          : `You have ${numItems} items on your list , and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default Stats;
