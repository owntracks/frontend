// Regular expression for an ISO 8601 YYYY-MM-DD date.
// Used to validate dates from URL query parameters.
export const ISO_DATE_REGEXP = new RegExp(
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
);

// https://en.wikipedia.org/wiki/Earth_radius
// Used to calculate the distance between two coordinates.
export const EARTH_RADIUS_IN_KM = 6371;
