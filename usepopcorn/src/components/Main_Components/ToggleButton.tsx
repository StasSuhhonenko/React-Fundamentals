export default function ToggleButton({
  value,
  onToggle,
}: {
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <button className="btn-toggle" onClick={onToggle}>
      {value ? "–" : "+"}
    </button>
  );
}
