import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getProfileImage = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    const latestProfileImage = await ctx.db
      .query('profileImages')
      .withIndex('by_createdBy', (q) => q.eq('createdBy', args.userId))
      .order('desc')
      .first();

    if (!latestProfileImage) return null;

    return {
      ...latestProfileImage,
      url: await ctx.storage.getUrl(latestProfileImage.storageId),
    };
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const sendProfileImage = mutation({
  args: { storageId: v.id('_storage'), createdBy: v.id('users') },
  handler: async (ctx, args) => {
    await ctx.db.insert('profileImages', {
      createdBy: args.createdBy,
      storageId: args.storageId,
      format: 'image',
    });
  },
});

export const deleteProfileImageById = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const profileImageRecord = await ctx.db
      .query('profileImages')
      .withIndex('by_storageId', (q) => q.eq('storageId', args.storageId))
      .first();

    if (!profileImageRecord) return null;

    await ctx.db.delete(profileImageRecord._id);
    await ctx.storage.delete(args.storageId);

    return profileImageRecord._id;
  },
});
