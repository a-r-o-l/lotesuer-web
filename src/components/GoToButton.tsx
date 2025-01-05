"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function GoToButton({
  goTo,
  title,
  className,
  variant = "default",
  children,
  size = "default",
}: {
  children?: React.ReactNode;
  goTo: string;
  title?: string;
  className?: string;
  disabled?: boolean;
  privateAccess?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(goTo);
      }}
      className={className}
      variant={variant}
      type="button"
      size={size}
    >
      {title}
      {children}
    </Button>
  );
}

export default GoToButton;
