import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

export default defineSchema({
  ...authTables,
  users: defineTable({
    role: v.union(v.literal('student'), v.literal('faculty'), v.literal('organization')),
    email: v.string(),
    username: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    schoolId: v.id('schools'),
    schoolName: v.string(),
    organizationIds: v.optional(v.array(v.id('organizations'))),
    profileImgUrl: v.optional(v.string()),
    attendingEvents: v.optional(v.array(v.id('events'))),
    maybeAttendingEvents: v.optional(v.array(v.id('events'))),
  }),
  schools: defineTable({
    schoolName: v.string(),
    county: v.optional(v.string()),
    schoolType: v.optional(v.string()),
    street: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    zip: v.optional(v.string()),
    events: v.optional(
      v.array(
        v.object({
          eventName: v.string(),
          eventDate: v.string(),
        })
      )
    ),
  }).index('by_name_zip', ['schoolName', 'zip']),
  organizations: defineTable({
    organizationName: v.string(),
    description: v.optional(v.string()),
    schoolId: v.id('schools'),
    memberIds: v.optional(v.array(v.id('users'))),
    orgImgUrl: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
  }),
  events: defineTable({
    eventName: v.string(),
    eventDate: v.string(),
    eventTimeFrom: v.string(),
    eventTimeTo: v.string(),
    eventContactPerson: v.optional(v.string()),
    eventContactEmail: v.optional(v.string()),
    eventContactPhone: v.optional(v.string()),
    eventOrganizationId: v.optional(v.id('organizations')),
    eventSchoolId: v.id('schools'),
    attendingCount: v.number(),
    maybeAttendingCount: v.number(),
    createdBy: v.id('users'),
    eventTags: v.array(v.string()),
    eventImgUrl: v.optional(v.string()),
    eventShareUrl: v.optional(v.string()),
  }),
  requests: defineTable({
    eventRequestName: v.string(),
    eventRequestCreatedBy: v.id('users'),
    eventRequestSchoolId: v.id('schools'),
    eventRequestOrganizationId: v.optional(v.id('organizations')),
    eventRequestTags: v.array(v.string()),
    eventRequestLikeCount: v.number(),
    likedByUsers: v.optional(v.array(v.id('users'))),
    eventRequestContactEmail: v.optional(v.string()),
    eventRequestMessages: v.optional(
      v.array(
        v.object({
          authorId: v.id('users'),
          message: v.string(),
          timestamp: v.string(),
        })
      )
    ),
    createdAt: v.string(),
    updatedAt: v.optional(v.string()),
    status: v.optional(v.string()),
  }),
});
