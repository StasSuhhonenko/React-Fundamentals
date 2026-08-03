import { useState } from "react";
import ToggleButton from "./ToggleButton";

export default function Box({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToggleButton value={isOpen} onToggle={setIsOpen} />
      {isOpen && children}
    </div>
  );
}
