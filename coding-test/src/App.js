import React from "react";
import { useEffect, useState } from "react";
import Details from "./components/Details";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [storyDetails, setStoryDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 10;
  function fetchDetails() {
    setLoading(true);
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((response) => {
        if (response.ok) {
          setLoading(false)
          return response.json();
        } else {
          throw new Error("oops Someting went wrong");
        }
      })
      .then((data) => {
        const randomItems = data
          .sort(() => Math.random() - Math.random())
          .slice(0, limit);
        const setOfAPI = randomItems.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (res) => res.json()
          )
        );
        Promise.all(setOfAPI).then((detail) => {
          setStoryDetails(detail);
        })
        .catch(error=>{
          setLoading(false);
          setError(error.message);
        });
      }
      ).catch((error)=>{
        setLoading(false);
        setError(error.message);
      })
  }
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div>
      <Header/>
      {error && <h2>{error}</h2>}
      {loading && <div>Loading...</div>}
      <Details arrayOfDetails={storyDetails} />
    </div>
  );
}

export default App;
