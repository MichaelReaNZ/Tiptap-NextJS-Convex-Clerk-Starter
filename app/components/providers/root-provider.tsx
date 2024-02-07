"use client";

import StoreUser from "./StoreUser";
import { ConvexClientProvider } from "./convex-provider";
import { ThemeProvider } from "./theme-provider";

type Props = {
  children: React.ReactNode;
};

export default function RootProvider({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      // defaultTheme="system" //TODO: Dark mode toggle
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>
        <StoreUser />

        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">
            {children}
            {/* <Toaster /> */}
          </div>
        </div>

        {/* <Analytics /> */}
      </ConvexClientProvider>
    </ThemeProvider>
  );
}
