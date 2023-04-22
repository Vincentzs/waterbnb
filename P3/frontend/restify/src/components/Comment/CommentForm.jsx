import React, { useState } from "react";
import Rating from "./Rating";

const CommentForm = ({ propertyId, onCommentAdded }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace this with your API call to submit a comment for the given propertyId.
    await fetch(`/api/property/${propertyId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, rating }),
    });

    setMessage("");
    setRating(0);
    onCommentAdded();
  };

  return (
    <div>
      <h4>Add a Comment</h4>
      <form onSubmit={handleSubmit}>
        <Rating rating={rating} setRating={setRating} />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your comment here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;
