import React, { useState, useEffect } from "react";
import UseCollection from "./useCollection";

function Members({ channelId }) {
  const members = UseCollection("users", undefined, [`channels.${channelId}`, "==", true]);

  return (
    <div className="Members">
      <div>
        {members.sort(sortByName).map((member) => {
          return (
            <div key={member.id} className="Member">
              {[member.status].map((activity) => (
                <div className={`MemberStatus ${activity.state}`} />
              ))}

              {member.displayName}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function sortByName(a, b) {
  return a.displayName > b.displayName ? 1 : a.displayName < b.displayName ? -1 : 0;
}
export default Members;
