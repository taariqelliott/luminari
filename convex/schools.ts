import { v } from 'convex/values';
import { api } from './_generated/api';
import { action, mutation, query } from './_generated/server';

export const addSchool = mutation({
  args: {
    schoolName: v.string(),
    county: v.optional(v.string()),
    schoolType: v.optional(v.string()),
    street: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    zip: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const newSchoolId = await ctx.db.insert('schools', args);
    return newSchoolId;
  },
});

export const getAllSchools = query({
  args: {},
  handler: async (ctx) => {
    const schools = await ctx.db.query('schools').collect();
    return schools.sort((a, b) => a.schoolName.localeCompare(b.schoolName));
  },
});

// Add school only if it doesn't exist
export const addSchoolIfNotExists = mutation({
  args: {
    schoolName: v.string(),
    county: v.optional(v.string()),
    schoolType: v.optional(v.string()),
    street: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    zip: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if school already exists
    const existingSchool = await ctx.db
      .query('schools')
      .filter((q) =>
        q.and(q.eq(q.field('schoolName'), args.schoolName), q.eq(q.field('county'), args.county))
      )
      .first();

    if (existingSchool) {
      return { schoolId: existingSchool._id, wasNew: false };
    }

    // Add new school if it doesn't exist
    const newSchoolId = await ctx.db.insert('schools', args);
    return { schoolId: newSchoolId, wasNew: true };
  },
});

export const fetchAndAddSchools = action({
  args: {},
  handler: async (ctx) => {
    const apiUrl =
      'https://mdgeodata.md.gov/imap/rest/services/Education/MD_EducationFacilities/FeatureServer/5/query?outFields=*&where=1%3D1&f=geojson';
    if (!apiUrl) return;

    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      const schools = json.features;

      let addedCount = 0;
      let skippedCount = 0;

      console.log(`Processing ${schools.length} schools from API...`);

      for (const school of schools) {
        const currentSchoolData = {
          schoolName: school.properties.SCHOOL_NAME,
          county: school.properties.County ?? undefined,
          schoolType: school.properties.School_Type ?? undefined,
          street: school.properties.STREET ?? undefined,
          city: school.properties.CITY ?? undefined,
          state: school.properties.STATE ?? undefined,
          zip: school.properties.ZIP ?? undefined,
        };

        const result = await ctx.runMutation(api.schools.addSchoolIfNotExists, currentSchoolData);

        if (result.wasNew) {
          addedCount++;
        } else {
          skippedCount++;
        }
      }

      console.log(
        `School sync completed! Added: ${addedCount} new schools, Skipped: ${skippedCount} existing schools`
      );
      return { addedCount, skippedCount, totalProcessed: schools.length };
    } catch (err) {
      console.error('Failed to fetch/add schools:', err);
      throw err;
    }
  },
});
