import { useEffect, useRef, useState, type ReactNode } from "react";

interface DropdownTriggerProps {
  isOpen: boolean;
  toggle: () => void;
}

interface DropdownPanelProps {
  close: () => void;
}

interface DropdownProps {
  trigger: (props: DropdownTriggerProps) => ReactNode;
  children: (props: DropdownPanelProps) => ReactNode;
  className?: string;
  panelClassName?: string;
}

export const Dropdown = ({
  trigger,
  children,
  className = "relative",
  panelClassName = "absolute right-0 top-full z-10 mt-2 overflow-hidden rounded-lg border border-white/10 bg-surface-elevated shadow-xl",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((open) => !open);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className={className}>
      {trigger({ isOpen, toggle })}
      {isOpen && <div className={panelClassName}>{children({ close })}</div>}
    </div>
  );
};
