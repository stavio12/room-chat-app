import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Channel from "./Channel.js";
import { db, firebase, setupPresence } from "../firebase";
import { Router, Redirect } from "@reach/router";

function useAuth() {
  const [user, setUser] = useState();

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        setUser(user);
        db.collection("users").doc(user.uid).set(user, { merge: true });

        setupPresence(user)
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
}

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="channel/:channelId" user={user} />
        <Redirect from="/" to="/channel/general" />
      </Router>
    </div>
  ) : (
    <Login />
  );
}

function Login() {
  const [authError, setAuthError] = useState(null);

  const signinUser = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };

  return (
    <div className="Login">
      <h1>Chat!</h1>
      <button className="btn btn-warning" onClick={signinUser}>
        Sigin in with Google
      </button>
      {authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p>
            <strong>
              {" "}
              <i className="text-danger">{authError.message}</i>
            </strong>
          </p>
          <p>Please try again</p>
        </div>
      )}
    </div>
  );
}

export default App;
