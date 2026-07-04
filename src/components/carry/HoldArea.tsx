//src/components/carry/HoldArea.tsx

import { useRef, useState } from "react";
import type { Point } from "./types";

type HoldAreaProps = {
onHoldStart?: (point: Point) => void;
onHoldMove?: (point: Point) => void;
onHoldEnd?: () => void;
children?: React.ReactNode;
};

export default function HoldArea({
onHoldStart,
onHoldMove,
onHoldEnd,
children,
}: HoldAreaProps) {
const containerRef = useRef<HTMLDivElement>(null);

const [holding, setHolding] = useState(false);
const [point, setPoint] = useState<Point>({ x: 0, y: 0 });

const getPoint = (
e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
): Point => {
const rect = containerRef.current!.getBoundingClientRect();

if ("touches" in e) {  
  return {  
    x: e.touches[0].clientX - rect.left,  
    y: e.touches[0].clientY - rect.top,  
  };  
}  

return {  
  x: e.clientX - rect.left,  
  y: e.clientY - rect.top,  
};

};

const start = (
e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
) => {
const p = getPoint(e);

setHolding(true);  
setPoint(p);  

onHoldStart?.(p);

};

const move = (
e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
) => {
if (!holding) return;

const p = getPoint(e);  

setPoint(p);  

onHoldMove?.(p);

};

const end = () => {
setHolding(false);
onHoldEnd?.();
};

return (
<div  
ref={containerRef}  
className="relative w-screen h-screen overflow-hidden touch-none select-none bg-black"  
onMouseDown={start}  
onMouseMove={move}  
onMouseUp={end}  
onMouseLeave={end}  
onTouchStart={start}  
onTouchMove={move}  
onTouchEnd={end}  
>
{children}

{holding && (  
    <>  
      {/* outer glow */}  
      <div  
        className="absolute pointer-events-none"  
        style={{  
          left: point.x,  
          top: point.y,  
          width: 90,  
          height: 90,  
          borderRadius: "50%",  
          transform: "translate(-50%, -50%)",  
          background:  
            "radial-gradient(circle, rgba(255,232,170,.45), rgba(255,232,170,0))",  
          animation: "carryPulse 1.6s infinite",  
        }}  
      />  

      {/* inner ring */}  
      <div  
        className="absolute pointer-events-none"  
        style={{  
          left: point.x,  
          top: point.y,  
          width: 34,  
          height: 34,  
          borderRadius: "50%",  
          transform: "translate(-50%, -50%)",  
          border: "2px solid rgba(255,245,200,.9)",  
          boxShadow: "0 0 20px rgba(255,235,160,.8)",  
        }}  
      />  

      {/* center dot */}  
      <div  
        className="absolute pointer-events-none"  
        style={{  
          left: point.x,  
          top: point.y,  
          width: 10,  
          height: 10,  
          borderRadius: "50%",  
          transform: "translate(-50%, -50%)",  
          background: "#fff9d8",  
          boxShadow: "0 0 15px #fff9d8",  
        }}  
      />  
    </>  
  )}  

  <style>{`  
    @keyframes carryPulse {  

      0%{  
        transform:translate(-50%,-50%) scale(.8);  
        opacity:.4;  
      }  

      50%{  
        transform:translate(-50%,-50%) scale(1.15);  
        opacity:.9;  
      }  

      100%{  
        transform:translate(-50%,-50%) scale(.8);  
        opacity:.4;  
      }  

    }  
  `}</style>  
</div>

);
}