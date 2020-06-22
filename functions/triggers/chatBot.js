const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

const bot = {
  displayName: "Gaz Bot",
  photoUrl: "https://miro.medium.com/max/837/0*Z7BBg5UiOY2k7MbY.png",
  uid: "gazbot",
  status: {
    lastChanged: new Date(),
    state: "online",
  },
  channels: {
    general: true,
  },
};

db.collection("users").doc(bot.uid).set(bot, { merge: true });

module.exports = functions.firestore
.document("channels/general/messages/{messageId}")
.onCreate((doc, context) => {
  const message = doc.data();
  if (!message.text.startsWith("@gazbot")) {
    return;
  }

  return db.collection("channels/general/messages").add({
    text: "Hey Whats up?",
    user: db.collection("users").doc("gazbot"),
    createdAt: new Date(),
  });
});
