import { useState } from "react";
import type { AccordionData } from "./types.ts";

function Accordion({ data }: { data: AccordionData[] }) {
  const [curOpen, setCurOpen] = useState<number | null>(null);
  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          num={i}
          title={el.title}
          key={el.text}
        >
          {el.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({
  num,
  title,
  curOpen,
  onOpen,
  children,
}: {
  num: number;
  title: string;
  text: string;
  curOpen: null | number;
  onOpen: React.Dispatch<React.SetStateAction<null | number>>;
  children: React.ReactNode;
}) {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{!isOpen ? "+" : "-"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

export default Accordion;
