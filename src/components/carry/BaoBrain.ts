//BaoBrain.ts
import gsap from "gsap";
import { BaoHandle } from "./bao";
import type { Point } from "./types";

type WalkParts = {
  body: HTMLImageElement;
  bag: HTMLImageElement;
  headForward: HTMLImageElement;
  leftArm: HTMLImageElement;
  leftLeg: HTMLImageElement;
  rightLeg: HTMLImageElement;
};

export default class BaoBrain {
  constructor(private bao: BaoHandle) {}

  private walkTL?: gsap.core.Timeline;
  private moveTween?: gsap.core.Tween;

  private readonly WALK = {
    duration: 0.22,
    legRotation: 14,
    armRotation: 18,
    bodyBounce: -3,
    bagRotation: 7,
    bagLift: 2,
    headRotation: 1,
    headBob: -1,
  };

  // --- THE GATEKEEPER ---
  private getWalkParts(): WalkParts | null {
    const { body, bag, headForward, leftArm, leftLeg, rightLeg } = this.bao;

    if (!body || !bag || !headForward || !leftArm || !leftLeg || !rightLeg) {
      return null;
    }

    return { body, bag, headForward, leftArm, leftLeg, rightLeg };
  }

  private showFace(face: "forward" | "blink" | "laugh") {
  const { headForward, headBlink, headLaugh } = this.bao;

  if (!headForward || !headBlink || !headLaugh) return;

  gsap.set(headForward, {
    opacity: face === "forward" ? 1 : 0,
  });

  gsap.set(headBlink, {
    opacity: face === "blink" ? 1 : 0,
  });

  gsap.set(headLaugh, {
    opacity: face === "laugh" ? 1 : 0,
  });
}

  // --- THE ORCHESTRATOR (reads like English now, you're welcome) ---
  walk() {
    if (this.walkTL) return;

    const parts = this.getWalkParts();
    if (!parts) return;

    this.walkTL = gsap.timeline({ repeat: -1 });

    this.animateLegs(this.walkTL, parts);
    this.animateArms(this.walkTL, parts);
    this.animateBody(this.walkTL, parts);
    this.animateBag(this.walkTL, parts);
    this.animateHead(this.walkTL, parts);
    this.showFace("forward");
  }

  private animateLegs(tl: gsap.core.Timeline, parts: WalkParts) {
    tl.to(
      parts.leftLeg,
      {
        rotation: this.WALK.legRotation,
        duration: this.WALK.duration,
        yoyo: true,
        repeat: 1,
        transformOrigin: "50% 18%",
        ease: "sine.inOut",
      },
      0
    );

    tl.to(
      parts.rightLeg,
      {
        rotation: -this.WALK.legRotation,
        duration: this.WALK.duration,
        yoyo: true,
        repeat: 1,
        transformOrigin: "50% 18%",
        ease: "sine.inOut",
      },
      0
    );
  }

  private animateArms(tl: gsap.core.Timeline, parts: WalkParts) {
    tl.to(
      parts.leftArm,
      {
        rotation: -this.WALK.armRotation,
        duration: this.WALK.duration,
        yoyo: true,
        repeat: 1,
        transformOrigin: "70% 25%",
        ease: "sine.inOut",
      },
      0
    );
  }

  private animateBody(tl: gsap.core.Timeline, parts: WalkParts) {
    tl.to(
      parts.body,
      {
        y: this.WALK.bodyBounce,
        duration: this.WALK.duration,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      },
      0
    );
  }

  private animateBag(tl: gsap.core.Timeline, parts: WalkParts) {
    tl.to(
      parts.bag,
      {
        rotation: this.WALK.bagRotation,
        y: this.WALK.bagLift,
        duration: this.WALK.duration,
        yoyo: true,
        repeat: 1,
        transformOrigin: "55% 20%",
        ease: "sine.inOut",
      },
      0
    );
  }

  private animateHead(tl: gsap.core.Timeline, parts: WalkParts) {
    tl.to(
      parts.headForward,
      {
        rotation: this.WALK.headRotation,
        y: this.WALK.headBob,
        duration: this.WALK.duration,
        yoyo: true,
        repeat: 1,
        transformOrigin: "50% 70%",
        ease: "sine.inOut",
      },
      0
    );
  }

  private playTimeline(tl: gsap.core.Timeline) {
  return new Promise<void>((resolve) => {
    tl.eventCallback("onComplete", () => resolve());
  });
}

async jumpTo(targetX: number, targetY: number, onNearLand?: () => void) {
  const root = this.bao.root;
  if (!root) return;

  this.stop();
//-----------------------------------------------
  console.log("jumpTo called", {
  targetX,
  targetY,
  innerHeight: window.innerHeight,
});

  const startX = Number(gsap.getProperty(root, "x"));
const startY = Number(gsap.getProperty(root, "y"));

console.log("START", {
  startX,
  startY,
  rect: root.getBoundingClientRect(),
});

  // don't let him jump below the visible floor, bro, he's not a submarine
  const MAX_Y = window.innerHeight - 200; // tweak this til his feet look grounded
  const finalY = gsap.utils.random(-20, 20);

  const midY = (startY + finalY) / 2;

  const distance = Math.abs(targetX - startX);
  const arcHeight = gsap.utils.clamp(120, 220, distance * 0.3);

  const peakY = midY - arcHeight;

  return new Promise<void>((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        this.bao.x = gsap.getProperty(root, "x") as number;
        this.bao.y = gsap.getProperty(root, "y") as number;
        console.log("END", {
  gsapY: gsap.getProperty(root, "y"),
  rect: root.getBoundingClientRect(),
});
        resolve();
      },
    });

    tl.to(root, {
      scaleX: 1.08,
      scaleY: 0.92,
      duration: 0.08,
      transformOrigin: "50% 100%",
      ease: "power2.out",
    });

    tl.to(root, {
      x: targetX,
      y: peakY,
      duration: 0.28,
      ease: "power2.out",
    });

    tl.to(root, {
      y: finalY,
      duration: 0.35,
      ease: "power2.inOut",
      onStart: () => {
        onNearLand?.();
      },
    });

    tl.to(root, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.12,
    });
  });
}


  moveTo(x: number, duration = 1) {
    const root = this.bao.root;
    if (!root) return Promise.resolve();

    this.walk();
    this.moveTween?.kill();

    return new Promise<void>((resolve) => {
      this.moveTween = gsap.to(root, {
        x,
        duration,
        ease: "power1.out",
        onUpdate: () => {
          this.bao.x = gsap.getProperty(root, "x") as number;
        },
        onComplete: () => {
          this.stop();
          resolve();
        },
      });
    });
  }

async reach(targetPoint?: Point) {
  const { leftArm, body, headForward } = this.bao;
  if (!leftArm || !body || !headForward) return;

  // if we know where the paper is, lean the whole body toward it
  const lean = targetPoint ? gsap.utils.clamp(-8, 8, (targetPoint.x - this.bao.x) * 0.02) : -3;

  await gsap.timeline()
    .to(leftArm, { rotation: -55, x: 8, y: -4, duration: 0.18, ease: "power3.out" }, 0) // snappier, less "reach", more "snatch"
    .to(body, { rotation: lean, x: 3, duration: 0.18, ease: "power3.out" }, 0)
    .to(headForward, { rotation: -4, x: 4, y: -1, duration: 0.18, ease: "power3.out" }, 0)
    // tiny recoil — the "got it, pulling back" beat
    .to([leftArm, body], { x: "-=2", duration: 0.1, ease: "power2.out" });
}

async releaseReach() {
  const { leftArm, body, headForward } = this.bao;

  if (!leftArm || !body || !headForward) return;

  await gsap.timeline()
    .to(
      [leftArm, body, headForward],
      {
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.22,
        ease: "power2.inOut",
      }
    );
}

  stop() {
    this.moveTween?.kill();
    this.moveTween = undefined;

    this.walkTL?.kill();
    this.walkTL = undefined;

    gsap.to(
      [
        this.bao.leftLeg,
        this.bao.rightLeg,
        this.bao.leftArm,
        this.bao.body,
        this.bao.bag,
        this.bao.headForward,
      ],
      {
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.2,
      }
    );
  }

  destroy() {
  this.moveTween?.kill();
  this.walkTL?.kill();

  this.moveTween = undefined;
  this.walkTL = undefined;
}


}