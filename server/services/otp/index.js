const db = require("../../firebase/config");

const getUserAccessCode = async (phoneNumber) => {
  const doc = await db.collection("users_access_code").doc(phoneNumber).get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
};

const saveUserAccessCode = async (phoneNumber, accessCode) => {
  await db.collection("users_access_code").doc(phoneNumber).set({ accessCode });
};

const clearUserAccessCode = async (phoneNumber, accessCode) => {
  await db
    .collection("users_access_code")
    .doc(phoneNumber)
    .set({ accessCode: "" });
};

module.exports = { getUserAccessCode, saveUserAccessCode, clearUserAccessCode };
