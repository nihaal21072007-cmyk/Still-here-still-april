import gsap from "gsap";
import { RefObject } from "react";
import { BaoHandle } from "@/components/carry/bao";
import type { Point } from "./types";

export function useCarryStory(
  baoRef: RefObject<BaoHandle | null>
) {

  const walkToFinger = (point: Point) => {

    requestAnimationFrame(() => {

      const bao = baoRef.current?.root;

      if (!bao) return;

      gsap.killTweensOf(bao);

      gsap.set(bao, {
        x: -260,
        opacity: 1,
      });

      gsap.timeline()

      .to({}, {
        duration: 0.45,
      })

      .to(bao, {

        duration: 1.6,

        x: point.x - 120,

        ease: "power2.out",

      });

    });

  };

  return {

    walkToFinger,

  };

}