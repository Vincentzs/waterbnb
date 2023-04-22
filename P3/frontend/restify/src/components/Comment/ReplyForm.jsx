import React, { useState } from "react";

const ReplyForm = ({ commentId, onReplyAdded }) => {
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace this with your API call to submit a reply for the given commentId.
    await fetch(`/api/comment/${commentId}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    setMessage("");
    setShowForm(false);
    onReplyAdded();
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="btn btn-sm btn-outline-secondary"
      >
        Reply
      </button>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your reply here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReplyForm;
