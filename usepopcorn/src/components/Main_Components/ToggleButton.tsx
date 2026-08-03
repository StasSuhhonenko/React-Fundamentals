export default function ToggleButton({
  value,
  onToggle,
}: {
  value: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button className="btn-toggle" onClick={() => onToggle((open) => !open)}>
      {value ? "–" : "+"}
    </button>
  );
}
