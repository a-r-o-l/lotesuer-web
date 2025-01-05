"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

function LogoutButton({
  icon,
  variant,
  className,
}: {
  icon: React.ReactNode;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className: string;
}) {
  return (
    <form
      action={async () => {
        await signOut({
          redirectTo: "/login",
        });
      }}
    >
      <Button variant={variant} className={className}>
        {icon}
        Cerrar sesión
      </Button>
    </form>
  );
}

export default LogoutButton;
