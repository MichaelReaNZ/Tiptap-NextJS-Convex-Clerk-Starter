"use client";

import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
// import { Button } from "../ui/button"; //TODO: use shadcn button
import Link from "next/link";

export function SignInButtonModal() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return (
    <>
      {isAuthenticated && !isLoading && (
        // <Button asChild>
        <Link href="/dashboard">Go to XO dashboard</Link>
        // </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton redirectUrl="/dashboard" mode="modal">
          {/* <Button>Sign In</Button> */}
          Sign In
        </SignInButton>
      )}
    </>
  );
}
