import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "Your apiKey",
  authDomain: "authDomain",
  databaseURL: "DbURL",
  projectId: "ProjectID",
  storageBucket: "StorageBucket",
  messagingSenderId: "MsgID",
  appId: "AppID",
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const rtdb = firebase.database();

function setupPresence(user) {
  const isOfflineForRTDB = {
    state: "offline",
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineForRTDB = {
    state: "online",
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineForFirestore = {
    state: "online",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const isOfflineForFirestore = {
    state: "offline",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref(".info/connected").on("value", async (snapshot) => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore,
      });
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineForRTDB);
    userDoc.update({
      status: isOnlineForFirestore,
    });
  });
}

export { db, firebase, setupPresence };
