// start-profile.js
import axios from "axios";

const payload = {
  profile_data: {
    fingerprint: {
      os: "win",
      os_version: "11",
    },
  },
  headless: false,
  debug_port: true,
  timeout: 60,
};

export async function startOneTimeOctoProfile() {
  const res = await axios.post(
    "http://localhost:58888/api/profiles/one_time/start",
    payload
    // {
    //   headers: {
    //     "X-Octo-Api-Key": apiKey,
    //   },
    // }
  );

  return res;
}
