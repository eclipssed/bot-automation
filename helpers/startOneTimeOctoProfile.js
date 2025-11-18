// start-profile.js
import axios from "axios";
import "dotenv/config";

// https://proxy-seller.com/

// proxy: {
//   type: "https",
//   host: "res.proxy-seller.com",
//   port: 10004,
//   login: process.env.PROXY_USERNAME,
//   password: process.env.PROXY_PASSWORD,
// },
const payload = {
  profile_data: {
    fingerprint: {
      os: "win",
      os_version: "11", // [optional]
      os_arch: "x86", // [optional]
      user_agent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36", // [optional]
      screen: "1920x1080", // [optional]
      languages: {
        // [optional]
        type: "ip",
      },
      timezone: {
        // [optional]
        type: "ip",
      },
      geolocation: {
        // [optional]
        type: "ip",
      },
      cpu: 4, // [optional]
      ram: 8, // [optional]
      noise: {
        // [optional]
        webgl: true,
        canvas: false,
        audio: true,
        client_rects: false,
      },
      webrtc: {
        // [optional]
        type: "ip",
      },
      // dns: "1.1.1.1", // [optional]
      media_devices: {
        // [optional]
        video_in: 1,
        audio_in: 1,
        audio_out: 1,
      },
    },
    proxy: {
      type: "http",
      host: "res.proxy-seller.com",
      port: 10000,
      login: process.env.PROXY_USERNAME,
      password: process.env.PROXY_PASSWORD,
    },
    // extensions: [
    //   // [optional]
    //   "ewbjmajocgfcbeboaewbfgobmjsjcoja@1.0",
    // ],
    // start_pages: [
    //   // [optional]
    //   "https://fb.com",
    // ],
    // cookies: [
    //   {
    //     domain: ".google.com",
    //     expirationDate: 1639134293.313654,
    //     hostOnly: false,
    //     httpOnly: false,
    //     name: "1P_JAR",
    //     path: "/",
    //     sameSite: "no_restriction",
    //     secure: true,
    //     value: "2021-11-10-11",
    //   },
    // ],
  },
  headless: false, // [optional]
  debug_port: true, // [optional]
  flags: [], // [optional]
  timeout: 60, // [optional]
};

export async function startOneTimeOctoProfile() {
  const res = await axios.post(
    "http://localhost:58888/api/profiles/one_time/start",
    payload,
    {
      headers: {
        "X-Octo-Api-Key": process.env.OCTO_API_KEY,
      },
    }
  );

  return res;
}
