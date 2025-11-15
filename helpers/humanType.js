export default async function humanType(page, selector, text) {
  const min = 60; // minimum delay
  const max = 120; // maximum delay

  // Make sure input is ready
  await page.waitForSelector(selector, { visible: true });
  await page.focus(selector);

  for (const char of text) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    await page.type(selector, char, { delay });
  }
}
