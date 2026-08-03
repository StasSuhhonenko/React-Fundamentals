export function BillInput({
  billSum,
  onSetBillSum,
}: {
  billSum: number;
  onSetBillSum: (T: number) => void;
}) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="number"
        placeholder="Amount..."
        value={billSum}
        onChange={(e) => onSetBillSum(+e.target.value)}
      />
    </div>
  );
}
