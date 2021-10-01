import React, { useEffect, useState } from "react";
function Render({ storyDetails }) {
  const userId = storyDetails.by;
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = `https://hacker-news.firebaseio.com/v0/user/${userId}.json`;
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API);
      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setUserData(data);
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      {error && <h2>{error}</h2>}
      {loading && <div>Loading...</div>}
      <b>{storyDetails.title}</b>
      <br />
      Story URL:<a href={storyDetails.url}>click here</a>
      <br />
      Timestamp: {new Date(storyDetails.time * 1000).toGMTString()}
      <br />
      Score : {storyDetails.score}
      <br />
      Author id: {userData.id} <br />
      Author karma score :{userData.karma}
    </div>
  );
}

export default Render;
