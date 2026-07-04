//TrashActor.ts
import gsap from "gsap";
import type { TrashHandle } from "./Trash";

export default class TrashActor {
  constructor(private trash: TrashHandle) {}

  async spark() {
    if (!this.trash.root) return;

    this.trash.showSpark();

    gsap.fromTo(
      this.trash.root,
      {
        scale: 0.95,
      },
      {
        scale: 1.05,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      }
    );

    await new Promise<void>((resolve) => {
      gsap.delayedCall(0.8, resolve);
    });

    this.trash.showNormal();
  }

  destroy() {
    if (this.trash.root) {
      gsap.killTweensOf(this.trash.root);
    }
  }
}