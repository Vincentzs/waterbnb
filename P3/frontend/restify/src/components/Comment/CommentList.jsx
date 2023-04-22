import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import ReplyForm from "./ReplyForm";
import Rating from "./Rating";
import Pagination from "react-bootstrap/Pagination";
import API from "../../Api/Api";

const CommentsList = ({ propertyId }) => {
  const [comments, setComments] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchComments = async (page = 1) => {
    const response = await fetch(
      `${API}/property/${propertyId}/comments?page=${page}`
    );
    const data = await response.json();
    setComments(data.comments);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    fetchComments();
  }, [propertyId]);

  const handlePageChange = (page) => {
    setActivePage(page);
    fetchComments(page);
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm
        propertyId={propertyId}
        onCommentAdded={() => fetchComments()}
      />
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-info">
              <span className="comment-author">{comment.author_name}</span>
              <span className="comment-date">{comment.date}</span>
            </div>
            <Rating rating={comment.rating} />
            <p className="comment-text">{comment.message}</p>
            <ReplyForm
              commentId={comment.id}
              onReplyAdded={() => fetchComments()}
            />
            {comment.replies.map((reply) => (
              <div key={reply.id} className="comment-reply">
                <span className="reply-author">{reply.author_name}</span>
                <span className="reply-date">{reply.date}</span>
                <p className="reply-text">{reply.message}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default CommentsList;
