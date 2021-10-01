import React from "react";
import Render from "./Render";

function Details({ arrayOfDetails }) {
  const sortedItems = arrayOfDetails.sort((a, b) => {
    return a.score - b.score;
  });
  return (
    <div>
      <ul>
        {sortedItems.map((element) => {
          return (
            <li key={element.id}>
              <Render storyDetails={element} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Details;
