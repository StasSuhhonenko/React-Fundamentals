import { faqs } from "./data.ts";
import Accordion from "./Accordion.tsx";

function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

export default App;
