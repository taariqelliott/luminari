import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const addEventRequest = mutation({
  args: {
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
    likedByUsers: v.optional(v.array(v.id('users'))),
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
  },
  handler: async (ctx, args) => {
    const newEventRequestId = await ctx.db.insert('eventRequests', args);
    console.log(args);
    return newEventRequestId;
  },
});

export const getAllEventRequests = query({
  args: {},
  handler: async (ctx) => {
    const schools = await ctx.db.query('eventRequests').collect();
    return schools.sort((a, b) => a.eventRequestName.localeCompare(b.eventRequestName));
  },
});

export const getEventRequestById = query({
  args: {
    id: v.id('eventRequests'),
  },
  handler: async (ctx, args) => {
    const eventRequest = await ctx.db
      .query('eventRequests')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();
    return eventRequest;
  },
});

export const deleteEventRequestById = mutation({
  args: { id: v.id('eventRequests') },
  handler: async (ctx, args) => {
    const eventRequest = await ctx.db.delete(args.id);
    return eventRequest;
  },
});
