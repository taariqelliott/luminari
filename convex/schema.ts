// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The `users` table is required for Convex Auth.
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
    // Add the githubId field to match your auth configuration
    githubId: v.optional(v.number()),
  })
    // Add the required index for email lookups
    .index('email', ['email']),
});
