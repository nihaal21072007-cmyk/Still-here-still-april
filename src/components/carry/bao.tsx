import {
forwardRef,
useImperativeHandle,
useRef,
} from "react";

import body from "@/components/assets/bao/body.png";
import bag from "@/components/assets/bao/bag.png";

import headForward from "@/components/assets/bao/head-forward.png";
import headBlink from "@/components/assets/bao/head-blink.png";
import laugh from "@/components/assets/bao/laugh.png";

import leftArm from "@/components/assets/bao/left-arm.png";
import rightArm from "@/components/assets/bao/right-arm.png";

import leftLeg from "@/components/assets/bao/left-leg.png";
import rightLeg from "@/components/assets/bao/right-leg.png";

export type BaoHandle = {
  root: HTMLDivElement | null;

  body: HTMLImageElement | null;
  bag: HTMLImageElement | null;

  headForward: HTMLImageElement | null;
  headBlink: HTMLImageElement | null;
  headLaugh: HTMLImageElement | null;

  leftArm: HTMLImageElement | null;
  rightArm: HTMLImageElement | null;

  leftLeg: HTMLImageElement | null;
  rightLeg: HTMLImageElement | null;

  handAnchor: HTMLDivElement | null;

  x: number;
  y: number;
};


type Props = {
size?: number;
};

const Bao = forwardRef<BaoHandle, Props>(
({ size = 170 }, ref) => {

const position = useRef({
x: -260,
y: 0,
});

const rootRef = useRef<HTMLDivElement>(null);

const bodyRef = useRef<HTMLImageElement>(null);
const bagRef = useRef<HTMLImageElement>(null);

const headForwardRef = useRef<HTMLImageElement>(null);
const headBlinkRef = useRef<HTMLImageElement>(null);
const headLaughRef = useRef<HTMLImageElement>(null);

const leftArmRef = useRef<HTMLImageElement>(null);
const rightArmRef = useRef<HTMLImageElement>(null);

const leftLegRef = useRef<HTMLImageElement>(null);
const rightLegRef = useRef<HTMLImageElement>(null);

const handAnchorRef = useRef<HTMLDivElement>(null);


useImperativeHandle(ref, () => ({

get x() {  
return position.current.x;

},

set x(v:number){
position.current.x = v;
},

get y() {
return position.current.y;
},

set y(v:number){
position.current.y = v;
},

root: rootRef.current,  

body: bodyRef.current,  
bag: bagRef.current,  

headForward: headForwardRef.current,
headBlink: headBlinkRef.current,
headLaugh: headLaughRef.current,

leftArm: leftArmRef.current,  
rightArm: rightArmRef.current,  

leftLeg: leftLegRef.current,  
rightLeg: rightLegRef.current,

handAnchor: handAnchorRef.current,

}));

const layer: React.CSSProperties = {
position: "absolute",
inset: 0,
width: "100%",
height: "100%",
objectFit: "contain",
pointerEvents: "none",
userSelect: "none",
};

const headLayer: React.CSSProperties = {
  ...layer,
  transformOrigin: "50% 70%",
  transform: "translateX(10px)",
};



return (
<div
ref={rootRef}
data-bao="root"
className="absolute pointer-events-none select-none z-40"
style={{
width: size,
height: size,
left: -90,
bottom: 60,
transformOrigin: "center bottom",
}}
>

{/* Back Leg */}  
  <img  
    data-part="left-leg"
    ref={leftLegRef}  
    src={leftLeg}  
    draggable={false}  
    style={{  
      ...layer,  
      transform: "translateX(10px)",  
      transformOrigin: "50% 18%",  
    }}  
  />  

  {/* Front Leg */}  
  <img  
    data-part="right-leg"
    ref={rightLegRef}  
    src={rightLeg}  
    draggable={false}  
    style={{  
      ...layer,  
      transformOrigin: "50% 18%",  
    }}  
  />  

 {/* Left Arm */}  
  <img  
    data-part="left-arm"
    ref={leftArmRef}  
    src={leftArm}  
    draggable={false}  
    style={{  
      ...layer,  
      transformOrigin: "70% 25%",  
      left: -39,  
      top: 12,  

    }}  
  />  

  <div
  ref={handAnchorRef}
  style={{
    position: "absolute",

    left: 160,
    top: 58,

    width: 8,
    height: 8,

    borderRadius: "50%",

    opacity: 0,

    pointerEvents: "none",
  }}
/>


  {/* Right Arm */}  
  <img  
    data-part="right-arm"
    ref={rightArmRef}  
    src={rightArm}  
    draggable={false}  
    style={{  
      ...layer,  
      transformOrigin: "30% 25%",  
     
    }}  
  />  




  {/* Body */}  
  <img  
    data-part="body"
    ref={bodyRef}  
    src={body}  
    draggable={false}  
    style={layer}  
  />  

  {/* Bag */}  
  <img  
    data-part="bag"
    ref={bagRef}  
    src={bag}  
    draggable={false}  
    style={layer}  
  />  


  {/* Head (default) */}

{/* Head Forward */}
<img
data-part="head-forward"
ref={headForwardRef}
src={headForward}
draggable={false}
data-head="forward"
style={{
...headLayer,
opacity: 1,
}}
/>

{/* Head Blink */}
<img
data-part="head-blink"
ref={headBlinkRef}
src={headBlink}
draggable={false}
data-head="blink"
style={{
...headLayer,
opacity: 0,
}}
/>

{/* Head Laugh */}
<img
data-part="head-laugh"
ref={headLaughRef}
src={laugh}
draggable={false}
data-head="laugh"
style={{
...headLayer,
opacity: 0,
}}
/>

</div>

);
});

Bao.displayName = "Bao";

export default Bao;