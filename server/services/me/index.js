const db = require("../../firebase/config");

const getUserAccessToken = async (phoneNumber, accessCode) => {
  const doc = await db.collection("users").doc(phoneNumber).get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
};

module.exports = { getUserAccessToken };
