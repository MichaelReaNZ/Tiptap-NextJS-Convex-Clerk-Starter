import { v } from "convex/values";
import { query } from "../_generated/server";
import { getCurrentUser } from "../Users/functions";

export const getById = query({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUser(ctx.db, ctx.auth);
    const note = await ctx.db.get(args.noteId);

    if (!note) {
      throw new Error("Not found");
    }

    if (note.userId !== currentUser._id) {
      throw new Error("Unauthorized");
    }

    return note;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx.db, ctx.auth);
    const allNotes = await ctx.db
      .query("notes")
      // .withIndex("by_creation_time")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .order("desc")
      .collect();

    return allNotes;
  },
});
