const axios = require("axios");

let cachedToken = null;
let tokenExpiry = null;
const url = "http://20.244.56.144/test/auth";

const authPayload = {
  companyName: "Bannari Amman Institute of Technology",
  clientID: "48fa6327-25b0-4671-8dd9-83808ee7797d",
  clientSecret: "curfWcNibyTYQZYT",
  ownerName: "Priyadarshan B",
  ownerEmail: "priyadarshan.cs22@bitsathy.ac.in",
  rollNo: "7376221CS269"
};

const fetchAuthToken = async () => {
  try {
    const response = await axios.post(url, authPayload);
    const { access_token, expires_in } = response.data;
    cachedToken = access_token;
    tokenExpiry = Date.now() + expires_in * 1000; // Convert seconds to milliseconds
    return cachedToken;
  } catch (error) {
    console.error("Error fetching auth token:", error.response?.data || error.message);
    throw new Error("Authentication failed");
  }
};

const getAuthToken = async () => {
  if (!cachedToken || Date.now() >= tokenExpiry) {
    return await fetchAuthToken();
  }
  return cachedToken;
};

module.exports = getAuthToken;