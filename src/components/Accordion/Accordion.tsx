import { useState } from 'react';
import './Accordion.scss';

interface AccordionProps {
  title: string;
  children: JSX.Element;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="components-accordion-wrapper">
      <div className="header" onClick={toggleAccordion}>
        <h2 className="title">{title}</h2>
        <div className="icon">{isOpen ? '-' : '+'}</div>
      </div>
      {isOpen && <div className="content">{children}</div>}
    </div>
  );
};

export default Accordion;
