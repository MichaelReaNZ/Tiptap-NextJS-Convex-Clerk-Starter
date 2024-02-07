"use client";

import { SignIn } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    //* This needs to be here otherwise unauthenticated calls will be made through query
    return (
      <div className="h-full flex items-center justify-center">
        {/* <Spinner size="lg" /> */}
      </div>
    );
  }

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <SignIn redirectUrl={"/dashboard"} />
      </div>
    );
  }

  return (
    <div>
      {/* <Navigation /> */}

      <main className="flex-1 h-full overflow-y-auto">
        {/* <SearchCommand /> */}
        {children}
      </main>
      {/* <AiChatRightSideBar /> */}
    </div>
  );
};

export default MainLayout;
