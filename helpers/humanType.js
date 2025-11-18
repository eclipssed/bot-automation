import { getRandom } from "./utils.js";

export default async function humanType(page, selector, text) {
  const min = 60; // minimum delay
  const max = 120; // maximum delay

  // Make sure input is ready
  await page.waitForSelector(selector, { visible: true });
  await page.focus(selector);

  for (const char of text) {
    const delay = getRandom(min, max);
    await page.type(selector, char, { delay });
  }
}
