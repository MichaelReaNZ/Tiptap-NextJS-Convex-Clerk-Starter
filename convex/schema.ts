import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]), //*Created in storeUser //TODO: look into another way to do this, via Clerk Webhook

  notes: defineTable({
    title: v.string(),
    userId: v.string(),
    content: v.optional(v.string()),
  }).index("by_user", ["userId"]),
});
