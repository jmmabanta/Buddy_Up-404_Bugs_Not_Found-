const { OAuth2Client } = require("google-auth-library");

const authClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage" // For some reason, this MUST be "postmessage"
);

// Given JWT token, get user data
// (yes, the security is kinda bad...)
const getUserData = async (id_token) => {
  const ticket = await authClient.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const userData = ticket.getPayload();
  return userData;
};

module.exports = { getUserData };
