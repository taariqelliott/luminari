import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  ...authTables,
  users: defineTable({
    clerkId: v.string(),
    role: v.union(v.literal('student'), v.literal('faculty'), v.literal('organization')),
    email: v.string(),
    username: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    schoolName: v.string(),
    hasCompletedOnboarding: v.boolean(),
    schoolId: v.optional(v.id('schools')),
    organizationIds: v.optional(v.array(v.id('organizations'))),
    profileImgUrl: v.optional(v.string()),
    attendingEvents: v.optional(v.array(v.id('events'))),
  }).index('byClerkId', ['clerkId']),

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
    schoolName: v.optional(v.string()),
    memberIds: v.optional(v.array(v.id('users'))),
    orgImgUrl: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
  }),

  events: defineTable({
    eventName: v.string(),
    eventDate: v.string(),
    eventStartTime: v.string(),
    eventEndTime: v.string(),
    eventContactPerson: v.optional(v.string()),
    eventContactEmail: v.optional(v.string()),
    eventContactPhone: v.optional(v.string()),
    eventOrganizationId: v.optional(v.id('organizations')),
    eventSchoolName: v.string(),
    eventSchoolId: v.optional(v.id('schools')),
    attendingUserIds: v.optional(v.id('users')),
    createdBy: v.id('users'),
    eventTags: v.array(v.string()),
    eventImgUrl: v.optional(v.string()),
  }),

  eventRequests: defineTable({
    eventRequestName: v.string(),
    eventRequestCreatedById: v.id('users'),
    eventRequestCreatedBy: v.string(),
    eventRequestDescription: v.string(),
    eventRequestSchoolId: v.optional(v.id('schools')),
    eventRequestSchoolName: v.string(),
    eventRequestOrganizationId: v.optional(v.id('organizations')),
    eventRequestTags: v.array(v.string()),
    eventRequestContactEmail: v.string(),
    eventRequestLikeCount: v.optional(v.number()),
    supportedByUserIds: v.optional(v.array(v.id('users'))),
    eventRequestMessages: v.optional(
      v.array(
        v.object({
          authorId: v.id('users'),
          message: v.string(),
          timestamp: v.string(),
        })
      )
    ),
    eventRequestStatus: v.optional(v.string()),
  }),

  profileImages: defineTable({
    createdBy: v.id('users'),
    storageId: v.id('_storage'),
    format: v.string(),
  })
    .index('by_createdBy', ['createdBy'])
    .index('by_storageId', ['storageId']),

  eventImages: defineTable({
    createdBy: v.id('users'),
    eventName: v.id('events'),
    storageId: v.id('_storage'),
    format: v.string(),
  })
    .index('by_createdBy', ['createdBy'])
    .index('by_storageId', ['storageId'])
    .index('by_eventName', ['eventName']),
});
