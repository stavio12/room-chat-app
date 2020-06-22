import React, { useState, useEffect } from "react";
import { db } from "../firebase";

function ChatInputBox({ user, channelId }) {
  const [msg, setMsg] = useState();

  function sentMsg(e) {
    e.preventDefault();
    db.collection("channels")
      .doc(`${channelId}`)
      .collection("messages")
      .add({
        user: db.collection("users").doc(user.uid),
        displayName: db.collection("users").doc(user.displayName),
        text: msg,
        createdAt: new Date(),
      });
    setMsg(e.target.reset());
  }

  return (
    <>
      <form onSubmit={sentMsg} className="ChatInputBox">
        <input onChange={(e) => setMsg(e.target.value)} type="text" className="ChatInput" placeholder={`Message #${channelId}`} />
      </form>
    </>
  );
}

export default ChatInputBox;
