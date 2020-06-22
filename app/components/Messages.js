import React, { useEffect, useState, useRef } from "react";
import UseCollection from "./useCollection";
import UseDocCache from "./UseDocCache";
import { db, firebase } from "../firebase";
import { format, isSameDay } from "date-fns";

function shouldShowAvatar(previous, Msg) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const differentUser = Msg.user.id !== previous.user.id;
  if (differentUser) {
    return true;
  }

  const hasBeenAWhile = Msg.createdAt.seconds - previous.createdAt.seconds > 120;

  return hasBeenAWhile;
}

function shouldShowDay(previous, Msg) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const isNewDay = !isSameDay(previous.createdAt.seconds * 1000, Msg.createdAt.seconds * 1000);

  return isNewDay;
}

function ChatScroller(props) {
  const ref = useRef();
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const node = ref.current;
      node.scrollTop = node.scrollHeight;
    }
  });

  const handleScroll = () => {
    const node = ref.current;
    const { scrollTop, clientHeight, scrollHeight } = node;
    const atBottom = scrollHeight == clientHeight + scrollTop;
    shouldScrollRef.current = atBottom;
  };

  return <div {...props} ref={ref} onScroll={handleScroll} />;
}

function Messages({ channelId }) {
  const msgs = UseCollection(`channels/${channelId}/messages`, "createdAt");

  return (
    <>
      <ChatScroller className="Messages">
        <div className="EndOfMessages">That's every message!</div>

        {msgs.map((Msg, index) => {
          const previous = msgs[index - 1];
          const showAvatar = shouldShowAvatar(previous, Msg);
          const showDay = shouldShowDay(previous, Msg);
          return showAvatar ? (
            <UserProfile key={Msg.id} Msg={Msg} showDay={showDay} />
          ) : (
            <div key={index}>
              <div className="Message no-avatar">
                <div className="MessageContent">{Msg.text}</div>
              </div>
            </div>
          );
        })}
      </ChatScroller>
    </>
  );
}

function UserProfile({ showDay, Msg }) {
  const author = UseDocCache(Msg.user.path);

  return (
    <div key={Msg.id}>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">{new Date(Msg.createdAt.seconds * 1000).toDateString()}</div>
          <div className="DayLine" />
        </div>
      )}

      <div className="Message with-avatar">
        <div className="Avatar" style={{ backgroundImage: author ? `url("${author.photoUrl}")` : "" }} />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName} </span>
            {""}
            <span className="TimeStamp"> {format(Msg.createdAt.seconds * 1000, "h:mm a")}</span>
          </div>
          <div className="MessageContent">{Msg.text}</div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
