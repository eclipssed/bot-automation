// main.js
import { startOneTimeOctoProfile } from "./helpers/startOneTimeOctoProfile.js";
import { connectToOcto } from "./helpers/connectToOcto.js";

async function run() {
  try {
    console.log("Starting Octo profile...");
    const { data } = await startOneTimeOctoProfile();

    const ws = data.ws_endpoint;
    if (!ws) throw new Error("Octo profile did not return wsEndpoint.");

    console.log("Connecting Puppeteer to Octo...");
    const browser = await connectToOcto(ws);

    const page = await browser.newPage();

    console.log("Opening Netflix...");
    await page.goto("https://netflix.com", { waitUntil: "networkidle2" });

    console.log("Done.");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
