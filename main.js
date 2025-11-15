// ========================== main.ts ==========================
// Purpose: Open an Octo Browser one-time profile, navigate to Binance,
// register page, type email in a human-like way, check agreement checkbox,
// click continue, and wait for captcha to be solved manually.

// ========================== Imports ==========================
import { startOneTimeOctoProfile } from "./helpers/startOneTimeOctoProfile.js";
import { connectToOcto } from "./helpers/connectToOcto.js";
import humanType from "./helpers/humanType.js";

// ========================== Configuration ==========================
const BASE_URL = "https://www.binance.com/en";
const REGISTER_URL = "https://accounts.binance.com/en/register?";
const EMAIL_TO_TYPE = "test@test.com";
const RANDOM_DELAY_MIN_MS = 2000;
const RANDOM_DELAY_MAX_MS = 3000;

// ========================== Utility Functions ==========================

/**
 * Returns a random integer between min and max (inclusive)
 */
function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Waits for a specified number of milliseconds
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ========================== Main Automation Flow ==========================

async function run() {
  try {
    // ------------------- Start Octo Browser Profile -------------------
    console.log("Starting Octo profile...");
    const { data } = await startOneTimeOctoProfile();

    const wsEndpoint = data.ws_endpoint;
    if (!wsEndpoint)
      throw new Error("Octo profile did not return a ws_endpoint.");

    // ------------------- Connect Puppeteer to Octo -------------------
    console.log("Connecting Puppeteer to Octo...");
    const browser = await connectToOcto(wsEndpoint);
    const page = await browser.newPage();

    // ------------------- Navigate to Base Page -------------------
    console.log(`Opening base page: ${BASE_URL}`);
    await page.goto(BASE_URL, { waitUntil: "networkidle2" });

    // ------------------- Wait Random Time -------------------
    const randomDelay = getRandomDelay(
      RANDOM_DELAY_MIN_MS,
      RANDOM_DELAY_MAX_MS
    );
    console.log(
      `Waiting ${randomDelay} ms before navigating to register page...`
    );
    await delay(randomDelay);

    // ------------------- Navigate to Registration Page -------------------
    console.log(`Navigating to register page: ${REGISTER_URL}`);
    await page.goto(REGISTER_URL, { waitUntil: "networkidle2" });

    // ------------------- Fill Email in Input Field -------------------
    console.log("Typing email in a human-like manner...");
    const emailInputSelector = 'input[name="username"], input[name="email"]';
    await humanType(page, emailInputSelector, EMAIL_TO_TYPE);

    // ------------------- Check Agreement Checkbox -------------------
    console.log("Checking agreement checkbox...");
    const agreementParentSelector = 'div[name="agreement"]';
    const agreementParent = await page.waitForSelector(
      agreementParentSelector,
      { visible: true }
    );

    const isAgreementChecked = await agreementParent.evaluate(
      (el) => el.getAttribute("aria-checked") === "true"
    );

    if (!isAgreementChecked) {
      const checkboxInner = await agreementParent.$(".bn-checkbox-icon");
      if (checkboxInner) {
        await checkboxInner.click();
        console.log("Checkbox checked!");
      } else {
        console.warn("Inner checkbox element not found!");
      }
    } else {
      console.log("Checkbox already checked!");
    }

    // ------------------- Click Continue Button -------------------
    console.log("Clicking the Continue button...");
    const continueButtonSelector = 'button[aria-label="Continue"]';
    await page.waitForSelector(continueButtonSelector, { visible: true });
    await page.click(continueButtonSelector);

    // ------------------- Wait for Captcha -------------------
    console.log("Waiting for captcha (solve it manually)...");
    // If you want to automatically detect captcha, uncomment below:
    // await page.waitForSelector(".captcha-component-selector", { timeout: 0 });
    // console.log("Captcha detected. Solve it manually, then hit ENTER in terminal.");
    // await new Promise(resolve => process.stdin.once("data", resolve));

    console.log(
      "Automation step completed. You can now handle captcha manually."
    );

    // ------------------- Optional Cleanup -------------------
    // await browser.disconnect();
    // await browser.close();
  } catch (err) {
    console.error("Automation Error:", err.message);
  }
}

// ========================== Run Automation ==========================
run();
