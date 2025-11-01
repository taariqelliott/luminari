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

export const deleteEventById = mutation({
  args: {
    id: v.id('events'),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.delete(args.id);
    return event;
  },
});

export const addUserToEventAttendees = mutation({
  args: {
    userId: v.id('users'),
    eventId: v.id('events'),
    attendingUserIds: v.array(v.id('users')),
  },
  handler: async (ctx, args) => {
    const { userId, eventId, attendingUserIds } = args;
    const newUserIds = [userId, ...attendingUserIds];
    const addUserToEventAttendance = await ctx.db.patch(eventId, {
      attendingUserIds: newUserIds,
    });
    return addUserToEventAttendance;
  },
});

export const deleteUserFromEventAttendees = mutation({
  args: {
    userId: v.id('users'),
    eventId: v.id('events'),
    attendingUserIds: v.array(v.id('users')),
  },
  handler: async (ctx, args) => {
    const { userId, eventId, attendingUserIds } = args;
    const usersNotIncludingRemovedUser = attendingUserIds.filter((id) => userId !== id);
    const addUserToEventAttendance = await ctx.db.patch(eventId, {
      attendingUserIds: usersNotIncludingRemovedUser,
    });
    return addUserToEventAttendance;
  },
});
