"use client";

// import { Button } from "@/components/ui/button";
import { api } from "../../../../convex/_generated/api";
import { SignIn, SignOutButton, useUser } from "@clerk/clerk-react";
import { useConvexAuth, useMutation } from "convex/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();

  const create = useMutation(api.Notes.mutation.create);

  const handleCreate = () => {
    const promise = create({ title: "Untitled01" }).then((noteId) =>
      router.push(`/Note/${noteId}`)
    );
    // toast.promise(promise, {
    //   loading: "Creating a new note...",
    //   success: "New note created!",
    //   error: "Failed to create a new note.",
    // });
  };

  if (!isLoading && !isAuthenticated) {
    return (
      <div className="flex justify-center py-24">
        <SignIn afterSignInUrl={"/dashboard"} />
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center p-12 gap-4">
      {`Hello ${user?.fullName} you are Logged in`}
      <SignOutButton>
        <button> Sign Out</button>
      </SignOutButton>

      <button onClick={() => router.push("/Notes")}>Go to All Notes</button>

      {/* //TODO: move to app sidebar */}
      <button onClick={handleCreate}>New Note</button>
    </main>
  );
}
