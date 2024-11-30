"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

const MouseEnterContext = createContext<{
  mouseX: number;
  mouseY: number;
  isHovered: boolean;
  setMouseX: React.Dispatch<React.SetStateAction<number>>;
  setMouseY: React.Dispatch<React.SetStateAction<number>>;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  mouseX: 0,
  mouseY: 0,
  isHovered: false,
  setMouseX: () => {},
  setMouseY: () => {},
  setIsHovered: () => {},
});

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left - width / 2) / width;
    const mouseY = (e.clientY - rect.top - height / 2) / height;
    setMouseX(mouseX);
    setMouseY(mouseY);
  };

  return (
    <MouseEnterContext.Provider value={{ mouseX, mouseY, isHovered, setMouseX, setMouseY, setIsHovered }}>
      <div
        className={cn(
          "py-8 flex items-center justify-center",
          containerClassName
        )}
      >
        <div
          className={cn("relative", className)}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setMouseX(0);
            setMouseY(0);
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { mouseX, mouseY, isHovered } = useContext(MouseEnterContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const rotateX = isHovered ? mouseY * 10 : 0;
    const rotateY = isHovered ? -mouseX * 10 : 0;

    element.style.transform = isHovered
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      : 'none';
  }, [mouseX, mouseY, isHovered]);

  return (
    <div
      ref={ref}
      className={cn(
        "w-[480px] bg-white dark:bg-black rounded-[22px] shadow-xl transition-transform duration-200 ease-out p-8",
        className
      )}
      style={{
        transformStyle: isHovered ? "preserve-3d" : "flat",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: any;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const { isHovered } = useContext(MouseEnterContext);

  return (
    <Tag
      className={cn("transition-transform", className)}
      style={{
        transform: isHovered
          ? `perspective(1000px) translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
          : 'none',
        transformStyle: isHovered ? "preserve-3d" : "flat",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}; 