import { ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Card } from "@/components/ui/card.tsx";

interface Props {
  offsetHoverMax?: number;
  offsetHoverMin?: number;
  children: ReactNode;
}

export default function MagneticCard({
  offsetHoverMax = 0.3,
  offsetHoverMin = 0.2,
  children,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function onHover(x: number, y: number) {
      gsap.to(element, {
        x: x * 0.8,
        y: y * 0.8,
        rotation: x * 0.05,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    function onLeave() {
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.7,
        ease: "elastic.out(1.2, 0.4)",
      });
    }

    function handleMouseMove(e: MouseEvent) {
      if (!element) return;

      const hoverArea = hover ? offsetHoverMax : offsetHoverMin;

      const cursor = {
        x: e.clientX,
        y: e.clientY - globalThis.scrollY,
      };

      const rect = element.getBoundingClientRect();
      const elPos = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const x = cursor.x - elPos.x;
      const y = cursor.y - elPos.y;
      const dist = Math.sqrt(x * x + y * y);

      const isHovering = dist < rect.width * hoverArea;

      if (isHovering) {
        setHover(true);
        onHover(x, y);
      } else if (hover) {
        setHover(false);
        onLeave();
      }
    }

    globalThis.addEventListener("mousemove", handleMouseMove);

    return () => {
      globalThis.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hover, offsetHoverMax, offsetHoverMin]);

  return (
    <Card ref={ref} {...props}>
      {children}
    </Card>
  );
}
