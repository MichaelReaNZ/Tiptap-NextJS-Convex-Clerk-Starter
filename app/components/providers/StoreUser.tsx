"use client";

import { api } from "../../../convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";

export default function StoreUser() {
  const { isAuthenticated } = useConvexAuth();
  const storeUser = useMutation(api.Users.mutation.storeUser);

  async function createUser() {
    const id = await storeUser();
  }

  if (isAuthenticated) {
    createUser();
  }

  return <></>;
}
