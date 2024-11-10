"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const url = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      const active = items.find((item) => item.url === url);
      setActiveItem(active ? active.url : null);
    }
  }, [url, items]);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className={cn(
              "group",
              activeItem === item.url
                ? "bg-sidebar-active text-sidebar-active-foreground"
                : "text-sidebar-foreground"
            )}
          >
            <Link href={item.url}>
              <SidebarMenuButton
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
