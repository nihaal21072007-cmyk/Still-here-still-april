import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

export type PaperHandle = {
  root: HTMLDivElement | null;
  setText: (text: string) => void;
};

type Props = {
  text: string;
};

const Paper = forwardRef<PaperHandle, Props>(({ text }, ref) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    root: rootRef.current,

    setText(value: string) {
      if (textRef.current) {
        textRef.current.textContent = value;
      }
    },
  }));

  return (
    <div
      ref={rootRef}
      className="absolute pointer-events-none"
      style={{
        left: 0,
        top: 0,
        transform: "translate(-50%, -50%)",
        opacity: 0,
      }}
    >
      <div
        ref={textRef}
        className="rounded-md bg-[#fff9e8] px-3 py-2 text-black shadow-lg"
        style={{
          fontFamily: "serif",
          fontSize: 14,
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {text}
      </div>
    </div>
  );
});

Paper.displayName = "Paper";

export default Paper;