import { action, mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { api } from './_generated/api';

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
        await ctx.runMutation(api.schools.addSchool, currentSchoolData);
      }

      console.log('All schools added successfully!');
    } catch (err) {
      console.error('Failed to fetch/add schools:', err);
    }
  },
});
