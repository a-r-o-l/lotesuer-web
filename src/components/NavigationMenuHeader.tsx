"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Home, Users, Banknote } from "lucide-react";

function NavigationMenuHeader() {
  const pathname = usePathname();

  const navItems = [
    { name: "Inicio", href: "/dashboard", icon: Home },
    {
      name: "Ventas",
      href: "/dashboard/sales",
      icon: Banknote,
      dropdown: [
        { name: "Quiniela", href: "/dashboard/sales/quiniela" },
        { name: "Bingos", href: "/dashboard/sales/bingos" },
      ],
    },
    { name: "Vendedores", href: "/dashboard/sellers", icon: Users },
  ];

  return (
    <nav className="bg-background">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-medium",
                          pathname.startsWith(item.href)
                            ? "text-red-500"
                            : "text-muted-foreground"
                        )}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.name}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "w-full",
                              pathname === subItem.href ? "bg-accent" : ""
                            )}
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium",
                      pathname === item.href
                        ? "text-red-500"
                        : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenuHeader;
