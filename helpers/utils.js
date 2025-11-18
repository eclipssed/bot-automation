// ========================== Utility Functions ==========================

/**
 * Returns a random integer between min and max (inclusive)
 */
export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Waits for a specified number of milliseconds
 */
export function delay(min, max) {
  const delay = getRandom(min, max);
  return new Promise((resolve) => setTimeout(resolve, delay));
}
