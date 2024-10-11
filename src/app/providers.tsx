"use client";

import "@/styles/bootstrap.scss";
import "@/styles/style.css";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { NextUIProvider } from "@nextui-org/system";

import { AuthProvider } from "@/auth/provider";
import { QnAProvider } from "@/bot/provider";
import ChatOffcanvas from "@/components/chat";

export function Providers({ children, ...themeProps }: ThemeProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <AuthProvider>
          <QnAProvider>
            {children}
            {pathname !== "/chat" && <ChatOffcanvas />}
          </QnAProvider>
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
