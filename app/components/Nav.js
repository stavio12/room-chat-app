import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase";
import UseCollection from "./useCollection";
import { Link } from "@reach/router";

function Nav({ user }) {
  const channels = UseCollection("channels");

  return (
    <>
      <div className="Nav">
        <div className="User">
          <img className="UserImage" alt="whatever" src={user.photoUrl} />
          <div>
            <div>{user.displayName}</div>
            <div>
              <button
                onClick={() => {
                  firebase.auth().signOut();
                }}
                className="text-button"
              >
                log out
              </button>
            </div>
          </div>
        </div>
        <nav className="ChannelNav">
          {channels.map((channel, index) => (
            <Link key={channel.id} to={`/channel/${channel.id}`}>
              # {channel.id}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Nav;
