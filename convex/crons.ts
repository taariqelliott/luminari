import { cronJobs } from 'convex/server';
import { api } from './_generated/api';

const crons = cronJobs();

// Run every day at midnight UTC
crons.interval('fetch latest school api data', { hours: 168 }, api.schools.fetchAndAddSchools);

export default crons;
