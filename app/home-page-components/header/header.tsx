"use client";

import { NavBar2 } from "@/app/components/nav-bar";
import { ModeToggle } from "@/app/dark-mode";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
// @ts-ignore
import { LayoutDashboard } from "lucide-react";

function NavBarHeader() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const user = session?.user;
  return (
    <div>
      <NavBar2
        isSticky={false}
        leftAddon={<ModeToggle />}
        domain={{ name: "SecurePortal", logo: <LayoutDashboard /> }}
        authLinks={{
          register: {
            isVisible: user ? false : true,
            onClick: () => {
              push("/register");
            },
          },

          login: {
            variant: user ? "default" : "ghost",
            text: user ? "Go to dashboard" : "Login",
            onClick: () => {
              if (user) {
                push("/dashboard");
              } else {
                push("/login");
              }
            },
          },
        }}
      />
    </div>
  );
}

export default NavBarHeader;
