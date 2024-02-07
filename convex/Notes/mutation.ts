import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { getCurrentUser } from "../Users/functions";

export const create = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx.db, ctx.auth);

    const newNote = await ctx.db.insert("notes", {
      title: args.title,
      userId: user._id,
    });

    return newNote;
  },
});

export const update = mutation({
  args: {
    id: v.id("notes"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx.db, ctx.auth);

    const userId = user._id;

    const { id, ...restOfParams } = args;

    const existingNote = await ctx.db.get(args.id);

    if (!existingNote) {
      throw new Error("Not found");
    }

    if (existingNote.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const note = await ctx.db.patch(args.id, {
      ...restOfParams,
    });
  },
});
