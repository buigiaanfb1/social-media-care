const db = require("../../firebase/config");

const getUserAccessCode = async (phoneNumber) => {
  const doc = await db.collection("users").doc(phoneNumber).get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
};

const saveUserAccessCode = async (phoneNumber, accessCode) => {
  await db.collection("users").doc(phoneNumber).set({ accessCode });
};

const clearUserAccessCode = async (phoneNumber, accessToken) => {
  await db
    .collection("users")
    .doc(phoneNumber)
    .set({ accessToken, accessCode: "" });
};

module.exports = { getUserAccessCode, saveUserAccessCode, clearUserAccessCode };
