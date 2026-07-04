//src/components/carry/Trash.tsx
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import trash from "@/components/assets/bao/trash.png";
import trashSpark from "@/components/assets/bao/trash-spark.png";

export type TrashHandle = {
  root: HTMLDivElement | null;
  showSpark: () => void;
  showNormal: () => void;
};

const Trash = forwardRef<TrashHandle>((_, ref) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [spark, setSpark] = useState(false);

  useImperativeHandle(ref, () => ({
    root: rootRef.current,

    showSpark() {
      setSpark(true);
    },

    showNormal() {
      setSpark(false);
    },
  }));

  return (
    <div
      ref={rootRef}
      className="absolute pointer-events-none z-20"
      style={{
        right: 0,
        bottom: 50,
        width: 100,
      }}
    >
      <img
        src={spark ? trashSpark : trash}
        draggable={false}
        style={{
          width: "100%",
          display: "block",
          userSelect: "none",
        }}
      />
    </div>
  );
});

Trash.displayName = "Trash";

export default Trash;