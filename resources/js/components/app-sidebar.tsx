import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {  Calendar} from 'lucide-react';
import AppLogo from './app-logo';
import {index as calendar} from '@/routes/calendar';
import SidebarCalendar from './sidebar-calendar';
import { Checkbox } from './ui/checkbox';
import { RiCheckLine } from '@remixicon/react';
import { useCalendarContext } from '@/components/event-calendar/calendar-context';

const mainNavItems: NavItem[] = [
    {
        title: 'Calendar',
        href: calendar(),
        icon: Calendar,
    },
];

export function AppSidebar() {
  const { isColorVisible, toggleColorVisibility, etiquettes } = useCalendarContext();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={calendar()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                 <SidebarGroup className="px-1">
                <SidebarCalendar />
                </SidebarGroup>
        <SidebarGroup className="px-1 mt-3 pt-4 border-t">
          <SidebarGroupLabel className="uppercase text-muted-foreground/65">
          Etiquettes
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {etiquettes.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className="relative rounded-md [&>svg]:size-auto justify-between has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px]"
                  >
                    <span>
                      <span className="font-medium flex items-center justify-between gap-3">
                        <Checkbox
                          id={item.id}
                          className="sr-only peer"
                          checked={isColorVisible(item.color)}
                          onCheckedChange={() =>
                            toggleColorVisibility(item.color)
                          }
                        />
                        <RiCheckLine
                          className="peer-not-data-[state=checked]:invisible"
                          size={16}
                          aria-hidden="true"
                        />
                        <label
                          htmlFor={item.id}
                          className="peer-not-data-[state=checked]:line-through peer-not-data-[state=checked]:text-muted-foreground/65 after:absolute after:inset-0"
                        >
                          {item.name}
                        </label>
                      </span>
                      <span
                        className="size-1.5 rounded-full bg-(--event-color)"
                        style={
                          {
                            "--event-color": `var(--color-${item.color}-400)`,
                          } as React.CSSProperties
                        }
                      ></span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
