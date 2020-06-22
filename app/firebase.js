import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbjarSPbCD5gF3MEiD64KeRqBayUkR9ns",
  authDomain: "chat-app-ff51b.firebaseapp.com",
  databaseURL: "https://chat-app-ff51b.firebaseio.com",
  projectId: "chat-app-ff51b",
  storageBucket: "chat-app-ff51b.appspot.com",
  messagingSenderId: "979935949252",
  appId: "1:979935949252:web:fa3dcd5498352b971cb491",
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
