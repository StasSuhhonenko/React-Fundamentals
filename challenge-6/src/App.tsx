import { useState } from "react";
import { BillInput } from "./components/BillInput.tsx";
import { QuestionInput } from "./components/Questioninput.tsx";

function App() {
  const [billSum, setBillSum] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [friendTip, setFriendsTip] = useState(0);
  const tipAmount = billSum * ((tipPercentage + friendTip) / 2 / 100);
  const totalSum = billSum + tipAmount;
  function handleReset() {
    setBillSum(0);
    setTipPercentage(0);
    setFriendsTip(0);
  }
  return (
    <div>
      <BillInput billSum={billSum} onSetBillSum={setBillSum} />
      <QuestionInput value={tipPercentage} onChangeValue={setTipPercentage}>
        <p>How did you like service?</p>
      </QuestionInput>
      <QuestionInput value={friendTip} onChangeValue={setFriendsTip}>
        <p>How did your friend like the service?</p>
      </QuestionInput>
      <h1>
        You pay ${totalSum.toFixed(2)} (${billSum.toFixed(2)} + $
        {tipAmount.toFixed(2)} tip)
      </h1>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
