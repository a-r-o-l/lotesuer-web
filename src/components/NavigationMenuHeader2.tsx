"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import { Banknote, Home, Users } from "lucide-react";

function NavigationMenuHeader2() {
  return (
    <NavigationMenu className="flex items-center justify-between">
      <NavigationMenuList>
        <SimpleListItem title="Inicio" url="/dashboard">
          <Home size={18} />
        </SimpleListItem>
        <SimpleListItem title="Ventas" url="/dashboard/sales/quiniela">
          <Banknote size={18} />
        </SimpleListItem>
        <SimpleListItem title="Vendedores" url="/dashboard/sellers">
          <Users size={18} />
        </SimpleListItem>

        <NavigationMenuItem>
          <Link href="/dashboard/salestest" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              salestest
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavigationMenuHeader2;

const SimpleListItem = ({
  title,
  url,
  children,
}: {
  title: string;
  url: string;
  children: React.ReactNode;
}) => {
  return (
    <NavigationMenuItem>
      <Link href={url} legacyBehavior passHref>
        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-40`}>
          <div className="text-sm font-medium leading-none flex items-center gap-2 w-full">
            {children}
            {title}
          </div>
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};
