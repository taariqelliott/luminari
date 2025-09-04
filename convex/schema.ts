import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.float64()),
    isAnonymous: v.optional(v.boolean()),

    githubId: v.optional(v.number()),
  }).index('email', ['email']),

  messages: defineTable({
    author: v.string(),
    content: v.string(),
    timestamp: v.optional(v.number()),
  }).index('by_author', ['author']),
});
