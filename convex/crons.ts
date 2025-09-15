import { cronJobs } from 'convex/server';
import { api } from './_generated/api';

const crons = cronJobs();

// Run every 2 weeka (336 hours) to sync school data
crons.interval('fetch latest school api data', { hours: 336 }, api.schools.fetchAndAddSchools);

export default crons;
