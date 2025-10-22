import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const addEvent = mutation({
  args: {
    eventName: v.string(),
    eventDate: v.string(),
    eventStartTime: v.string(),
    eventEndTime: v.string(),
    eventContactPerson: v.optional(v.string()),
    eventContactEmail: v.optional(v.string()),
    eventContactPhone: v.optional(v.string()),
    eventOrganizationId: v.optional(v.id('organizations')),
    eventSchoolName: v.string(),
    attendingUserIds: v.optional(v.array(v.id('users'))),
    createdBy: v.id('users'),
    eventTags: v.array(v.string()),
    eventImgUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const newEventId = await ctx.db.insert('events', args);
    console.log(args);
    return newEventId;
  },
});

export const getAllEvents = query({
  args: {},
  handler: async (ctx) => {
    const schools = await ctx.db.query('events').collect();
    return schools.sort((a, b) => a.eventName.localeCompare(b.eventName));
  },
});

export const getEventById = query({
  args: {
    id: v.id('events'),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db
      .query('events')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();
    return event;
  },
});
