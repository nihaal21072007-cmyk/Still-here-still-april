//CarryDirector.TS
import gsap from "gsap";
import type { Point } from "./types";

import type { BaoHandle } from "./bao";
import BaoBrain from "./BaoBrain";

import type { PaperHandle } from "./Paper";
import PaperActor from "./PaperActor";

import type { TrashHandle } from "./Trash";
import TrashActor from "./TrashActor";

type Mode = "carry" | "jumpCarry";

export default class CarryDirector {
private brain: BaoBrain;
private paper: PaperActor;
private trash: TrashActor;

private started = false;
private carrying = false;
private busy = false;

// Position where Bao stops beside the trash.
// Adjust this once after you see it in-game.
private readonly TRASH_STOP_X = window.innerWidth - 150;

constructor(
private bao: BaoHandle,
paper: PaperHandle,
trash: TrashHandle,
private onPaperFinished: () => void
) {
this.brain = new BaoBrain(bao);
this.paper = new PaperActor(paper);
this.trash = new TrashActor(trash);
}

private getHandPoint(): Point {
const anchor = this.bao.handAnchor;

if (!anchor) {  
  return {  
    x: this.bao.x + 105,  
    y: 590,  
  };  
}  

const rect = anchor.getBoundingClientRect();  

return {  
  x: rect.left + rect.width / 2,  
  y: rect.top + rect.height / 2,  
};

}

async start(text: string, point: Point){
if (!this.bao.root || this.busy) return;

this.busy = true;  
this.carrying = false;  

this.paper.spawn(text, point);  

// Bring Bao onto the screen once.  
if (!this.started) {  
  this.started = true;  

  gsap.set(this.bao.root, {  
    x: -260,  
    opacity: 1,  
  });  

  await this.brain.moveTo(point.x - 120, 1.5);  
} else {  
  await this.brain.moveTo(point.x - 120, 0.25);  
}  

// Grab paper.  
await this.brain.reach();  

await this.paper.moveTo(this.getHandPoint());  

this.carrying = true;  

const followHand = () => {

if (!this.carrying) return;

this.paper.follow(this.getHandPoint());

requestAnimationFrame(followHand);
};

followHand();

await this.brain.releaseReach();  

// Walk to trash.  
await this.brain.moveTo(this.TRASH_STOP_X, 1);  

// Keep paper attached while walking.  
this.paper.freeze();  
await this.paper.moveTo(this.getHandPoint(), 0.08);  

// Throw into trash.  
await this.brain.reach();  

this.carrying = false;

await this.paper.throwTo({
x: window.innerWidth - 50,     // tyftyft4f4hgdhgfghv1yhfgyhf4fd4yfydydydd
y: window.innerHeight - 170,
});

await this.paper.hide();

await this.trash.spark();

this.onPaperFinished();

await this.brain.releaseReach();

this.busy = false;
}




async jumpCapture(
  text: string,
  point: Point,
  trashPoint: Point
) {
  if (!this.bao.root || this.busy) return;

  this.busy = true;
  this.carrying = false;

  this.paper.spawn(text, point);

  console.log("CarryDirector point:", point);

  await this.brain.jumpTo(
    point.x - 20,
    point.y,
    () => {
      this.brain.reach(point); // tells reach() exactly where the "steal" target is
      this.paper.moveTo(this.getHandPoint(), 0.3);
    }
  );

  this.carrying = true;

  const followHand = () => {
    if (!this.carrying) return;
    this.paper.follow(this.getHandPoint());
    requestAnimationFrame(followHand);
  };
  followHand();

  await this.brain.releaseReach();

  await this.brain.moveTo(this.TRASH_STOP_X, 1);

  this.paper.freeze();
  await this.paper.moveTo(this.getHandPoint(), 0.08);

  await this.brain.reach();

  this.carrying = false;

  await this.paper.throwTo({
    x: window.innerWidth - 50,
    y: window.innerHeight - 170,
  });

  await this.paper.hide();
  await this.trash.spark();

  this.onPaperFinished();

  await this.brain.releaseReach();

  this.busy = false;
}



update(point: Point) {
if (this.busy) {
if (this.carrying) {
this.paper.follow(this.getHandPoint());
}
return;
}

this.brain.moveTo(point.x - 120, 0.18);  

if (this.carrying) {  
  this.paper.follow(this.getHandPoint());  
} else {  
  this.paper.follow(point);  
}

}

stop() {
if (this.busy) return;

this.carrying = false;  

this.paper.freeze();  
this.paper.hide();  

this.brain.stop();

}

destroy() {
this.paper.destroy();
this.trash.destroy();
this.brain.destroy();
}
}