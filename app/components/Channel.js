import React, { useEffect, useState } from "react";
import ChannelInfo from "./ChannelInfo";
import ChatInputBox from "./ChatInputBox";
import Messages from "./Messages";
import Members from "./Members";
import { db } from "../firebase";

function Channel({ user, channelId }) {
  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true,
    });
  }, [user.uid, channelId]);

  return (
    <>
      <div className="Channel">
        <div className="ChannelMain">
          <ChannelInfo channelId={channelId} />
          <Messages channelId={channelId} />
          <ChatInputBox channelId={channelId} user={user} />
        </div>
        <Members channelId={channelId} />
      </div>
    </>
  );
}

export default Channel;
