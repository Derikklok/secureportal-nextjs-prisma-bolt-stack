

"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  Users,
  PawPrint,
  BrainCircuit,
  User,
  LucideIcon,
  AppWindow,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PanelLeftDashed } from "lucide-react";
import Image from "next/image";
import { IconType } from "react-icons/lib";
import { Card } from "@/components/ui/card";

// ========== TYPES ========== //
export type NavItem = {
  icon: ReactNode;
  name: string;
};

export type UpdatedNavItem = NavItem & { isSelected: boolean };

export type NavItemNames<T extends readonly NavItem[]> = T[number]["name"];

export interface SidebarProps<T extends readonly NavItem[]> {
  ref?: React.Ref<HTMLDivElement>;
  navItemsProp?: T;
  showcallToAction?: boolean;
  callToAction?: {
    icon?: LucideIcon | IconType;
    header?: string;
    descreption?: string;
    textButton?: string;
    onClickBtn?: () => void;
  };
  domainName?: string;
  domainObject?: { name?: string; icon?: ReactNode };
  userProfile?: {
    name?: string;
    email?: string;
    image?: string;
  };
  showTopSeperator?: boolean;
  openedWidth?: number;
  className?: string;
  onSelectItem?: (item: NavItem) => void;
  hideOpenSideBarIcon?: boolean;
  hideSideBar?: boolean;
  setHideSideBar?: (value: boolean) => void;
  showOverlay?: boolean;
  onOverlayClick?: () => void;
  overlayClassName?: string;
  selectedNavItem?: NavItemNames<T>; // name of the selected item
  setSelectedNavItem?: (name: NavItemNames<T>) => void; // callback to update selection
}

// ========== DEFAULTS ========== //
const DEFAULT_NAV_ITEMS: NavItem[] = [
  { icon: <Home />, name: "Dashboard" },
  { icon: <Calendar />, name: "Calendar" },
  { icon: <Users />, name: "Clients" },
  { icon: <PawPrint />, name: "Animals" },
] as const;

type DefaultNavItems = typeof DEFAULT_NAV_ITEMS;

const DEFAULT_CALL_TO_ACTION = {
  icon: BrainCircuit,
  header: "First Steps",
  descreption: "Customize your Dashboard and learn about our features",
  textButton: "Get Started",
  onClickBtn: () => {},
};

const DEFAULT_DOMAIN_OBJECT = { name: "App Name", icon: <AppWindow /> };
const DEFAULT_USER_PROFILE = {
  name: "user name",
  email: "userName@gmail.com",
  image: "",
};

// ========== COMPONENT ========== //
export function Sidebar1<T extends readonly NavItem[] = DefaultNavItems>({
  domainObject = DEFAULT_DOMAIN_OBJECT,
  navItemsProp = DEFAULT_NAV_ITEMS as unknown as T,
  showcallToAction = true,
  callToAction = DEFAULT_CALL_TO_ACTION,
  userProfile = DEFAULT_USER_PROFILE,
  onSelectItem,
  className,
  showTopSeperator = true,
  openedWidth = 270,
  hideOpenSideBarIcon = false,
  hideSideBar: propHideSideBar,
  setHideSideBar: propSetHideSideBar,
  showOverlay = false,
  onOverlayClick,
  overlayClassName = "bg-black/50",
  selectedNavItem: propSelectedNavItem,
  setSelectedNavItem: propSetSelectedNavItem,
  ref,
}: SidebarProps<T>) {
  type ItemNames = NavItemNames<T>;
  // ========== STATE ========== //
  const [internalHideSideBar, setInternalHideSideBar] = useState(false);
  const [showAppName, setShowAppName] = useState(true);
  const [internalSelectedNavItem, setInternalSelectedNavItem] =
    useState<ItemNames>(navItemsProp[0]?.name as ItemNames);

  // Determine if selection is controlled
  const isSelectionControlled = propSetSelectedNavItem !== undefined;
  const selectedNavItem = isSelectionControlled
    ? propSelectedNavItem || ""
    : internalSelectedNavItem;
  const setSelectedNavItem = isSelectionControlled
    ? propSetSelectedNavItem
    : setInternalSelectedNavItem;

  // Determine if we're in controlled mode
  const isControlled = propSetHideSideBar !== undefined;

  // Use props if controlled, internal state if uncontrolled
  const hideSideBar = isControlled
    ? (propHideSideBar ?? false)
    : internalHideSideBar;
  const setHideSideBar = isControlled
    ? propSetHideSideBar
    : setInternalHideSideBar;

  useEffect(() => {
    setShowAppName(!hideSideBar);
  }, [hideSideBar]);

  // Memoize navItems to prevent recalculations
  // Memoize navItems with isSelected property
  const navItems = useMemo(() => {
    return navItemsProp.map((item) => ({
      ...item,
      isSelected: item.name === selectedNavItem,
    }));
  }, [navItemsProp, selectedNavItem]);

  // ========== MEMOIZED VALUES ========== //
  const { header, descreption, textButton, onClickBtn } = callToAction;
  const { name: domainName, icon } = domainObject;
  const {
    name: userProfileName,
    email: userProfileEmail,
    image: userProfileImage,
  } = userProfile;

  // ========== STABLE CALLBACKS ========== //
  const handleClickedItem = useCallback(
    (item: UpdatedNavItem) => {
      setSelectedNavItem(item.name);

      if (onSelectItem) {
        onSelectItem(item);
      }
    },
    [setSelectedNavItem, onSelectItem]
  );

  // ========== TOGGLE FUNCTION ========== //
  const toggleSidebar = useCallback(() => {
    const newValue = !hideSideBar;

    // Handle the showAppName animation
    if (newValue) {
      setShowAppName(false);
    } else {
      setTimeout(() => setShowAppName(true), 60);
    }

    // Update state (works for both modes)
    setHideSideBar(newValue);
  }, [hideSideBar, setHideSideBar]);

  // ========== DEBUGGING ========== //

  // ========== RENDER ========== //
  return (
    <>
      {showOverlay && (
        <div
          className={`fixed inset-0 z-40 ${overlayClassName}`}
          onClick={onOverlayClick}
        />
      )}
      <Card
        ref={ref}
        style={{ width: `${hideSideBar ? "120px" : `${openedWidth}px`}` }}
        className={cn(
          `flex flex-col h-screen transition-all rounded-none   shadow-none border-t-0
        border-r py-8 border-b-0 px-3`,
          className
        )}
      >
        {/* Logo + Name */}
        <div className="px-4 flex items-center justify-between mb-6 gap-2">
          <div className="flex items-center gap-2">
            <div className="flex w-10 h-10 justify-center items-center gap-2 bg-primary rounded-md">
              <h1 className="text-2xl font-bold text-foreground p-2">{icon}</h1>
            </div>
            {showAppName && (
              <h1 className="font-medium text-xl w-fit">{domainName}</h1>
            )}
          </div>

          {!hideOpenSideBarIcon && (
            <div
              onClick={toggleSidebar}
              className="opacity-70 ml-3 cursor-pointer"
            >
              <PanelLeftDashed size={17} opacity={40} />
            </div>
          )}
        </div>

        {showTopSeperator && <Separator className="h-[1px] w-full px-3" />}

        {/* Navigation Items */}
        <nav
          className={`space-y-1 ${!showcallToAction && "mt-24"} px-2 flex-1 mt-16 mb-7  ${hideSideBar && "mx-auto mt-16"}`}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              onClick={() => handleClickedItem(item)}
              className={cn(
                "flex items-center  px-3 select-none cursor-pointer py-3 rounded-md transition-colors",
                item.isSelected
                  ? "bg-primary/5 text-primary dark:bg-neutral-800"
                  : "text-gray-300"
              )}
            >
              <span
                className={` ${!item.isSelected ? "text-gray-300" : "text-primary"} ${!hideSideBar && "mr-3"}`}
              >
                {item.icon}
              </span>
              {!hideSideBar && item.name}
            </a>
          ))}
        </nav>

        {/* Call to Action Section */}
        {showcallToAction && !hideSideBar && (
          <div className="mt-auto px-4 pb-6">
            <div className="flex flex-col items-center py-6 mb-5">
              {/* <CallToActionIcon size={42} className="text-primary-400 mb-4" /> */}
              <h3 className="font-medium text-sm">{header}</h3>
              <p className="text-xs text-gray-500 text-center mt-1 mb-3">
                {descreption}
              </p>
              <Button
                onClick={onClickBtn}
                variant="outline"
                size="sm"
                className="text-primary"
              >
                {textButton}
              </Button>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div
          className={`flex items-center pt-4 w-full border-t ${hideSideBar && "pt-7"}`}
        >
          {userProfileImage ? (
            <Image
              className={`border rounded-full size-9 ${hideSideBar && "mx-auto"}`}
              width={24}
              height={24}
              src={userProfileImage}
              alt="User profile"
            />
          ) : (
            <Avatar
              className={`h-8 w-8 flex justify-center items-center bg-slate-100 ${hideSideBar && "mx-auto"}`}
            >
              <User className="opacity-45" size={19} />
            </Avatar>
          )}
          {!hideSideBar && (
            <div className="ml-3">
              <p className="text-sm font-medium">{userProfileName}</p>
              <p className="text-xs text-gray-500">{userProfileEmail}</p>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export default Sidebar1;


