import { getOrdinalSuffix } from './helpers.js'

// Get today's date
const today = new Date();
// Format the date as yyyy-mm-dd
const dateForAPI = today.toISOString().split('T')[0];

// Get the components of the date
const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
const month = today.toLocaleDateString('en-US', { month: 'long' });
const day = today.getDate();
const year = today.getFullYear();

// Combine components with the ordinal suffix
const dayWithSuffix = day + getOrdinalSuffix(day);
const fullDate = `${weekday} ${month} ${dayWithSuffix}, ${year}`;

export { fullDate, dateForAPI }