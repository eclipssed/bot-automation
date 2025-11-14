import puppeteer from "puppeteer";

export async function connectToOcto(wsEndpoint) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsEndpoint
  });

  return browser;
}
