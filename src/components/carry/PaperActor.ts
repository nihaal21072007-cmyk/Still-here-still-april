//PaperActor.ts
import gsap from "gsap";
import type { PaperHandle } from "./Paper";
import type { Point } from "./types";

export default class PaperActor {
  constructor(private paper: PaperHandle) {}

  private followTween?: gsap.core.Tween;

spawn(text: string, point: Point) {
  if (!this.paper.root) return;

  this.paper.setText(text);

  gsap.killTweensOf(this.paper.root);

  gsap.set(this.paper.root, {
    x: point.x,
    y: point.y,
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    rotation: gsap.utils.random(-8, 8),
    opacity: 1,
  });

    gsap.to(this.paper.root, {
      scale: 1,
      duration: 0.25,
      ease: "back.out(2)",
    });
  }

async throwTo(point: Point) {
  if (!this.paper.root) return;

  this.freeze();

  const root = this.paper.root;

  const startX = gsap.getProperty(root, "x") as number;
  const startY = gsap.getProperty(root, "y") as number;

  const jumpHeight = gsap.utils.random(80, 120);

  return new Promise<void>((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });

    // Rotate while flying
    tl.to(
      root,
      {
        rotation: gsap.utils.random(-120, 120),
        scale: 0.9,
        duration: 0.55,
        ease: "none",
      },
      0
    );

    // Horizontal movement
    tl.to(
      root,
      {
        x: point.x,
        duration: 0.55,
        ease: "power1.inOut",
      },
      0
    );

    // Upward arc
    tl.to(
      root,
      {
        y: startY - jumpHeight,
        duration: 0.22,
        ease: "power2.out",
      },
      0
    );

    // Fall into trash
    tl.to(
      root,
      {
        y: point.y,
        duration: 0.33,
        ease: "power2.in",
      },
      0.22
    );
  });
}

  follow(point: Point) {
    if (!this.paper.root) return;

    this.followTween?.kill();

    this.followTween = gsap.to(this.paper.root, {
      x: point.x,
      y: point.y,
      duration: 0.08,
      ease: "power2.out",
    });
  }

  freeze() {
    this.followTween?.kill();
    this.followTween = undefined;
  }

  moveTo(point: Point, duration = 0.45) {
    if (!this.paper.root) return Promise.resolve();

    this.freeze();

    return new Promise<void>((resolve) => {
      gsap.to(this.paper.root!, {
        x: point.x,
        y: point.y,
        rotation: 0,
        duration,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });
  }

  hide() {
    if (!this.paper.root) return Promise.resolve();

    return new Promise<void>((resolve) => {
      gsap.to(this.paper.root!, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: resolve,
      });
    });
  }

  destroy() {
    this.followTween?.kill();

    if (this.paper.root) {
      gsap.killTweensOf(this.paper.root);
    }

    this.followTween = undefined;
  }
}