import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const addUser = mutation({
  args: {
    clerkId: v.string(),
    role: v.union(v.literal('student'), v.literal('faculty'), v.literal('organization')),
    email: v.string(),
    username: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    schoolName: v.string(),
    hasCompletedOnboarding: v.boolean(),
  },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert('users', args);
    return newUserId;
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const schools = await ctx.db.query('users').collect();
    return schools.sort((a, b) => a.schoolName.localeCompare(b.schoolName));
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const clerkUserId = await getAuthUserId(ctx);
    if (!clerkUserId) return null;

    const users = await ctx.db
      .query('users')
      .withIndex('byClerkId', (q) => q.eq('clerkId', clerkUserId))
      .collect();

    return users[0] ?? null;
  },
});

export const deleteConvexUser = mutation({
  args: { id: v.id('users') },
  handler: async (ctx, args) => {
    const deletedUser = await ctx.db.delete(args.id);
    return deletedUser;
  },
});
