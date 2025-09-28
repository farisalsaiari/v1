// components/FadeInWrapper.tsx
import { ReactNode, useEffect, useState } from "react";

interface FadeInWrapperProps {
  children: ReactNode;
}

export function FadeInWrapper({ children }: FadeInWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100); // slight delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={isVisible ? "animate-fadeIn" : "opacity-0"}>
      {children}
    </div>
  );
}
