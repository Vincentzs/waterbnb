import React from "react";

const Rating = ({ rating, setRating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className={`fa${rating >= i ? "s" : "r"} fa-star`}
        onClick={setRating ? () => setRating(i) : null}
        style={{ cursor: setRating ? "pointer" : "default" }}
      />
    );
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;
