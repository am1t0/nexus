import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import 'bootstrap/dist/css/bootstrap.min.css';

const DiscussionForum = () => {

  const discussions = [
    {
      id: 1,
      title: "Project Coordination Meeting",
      author: "John Doe",
      content: "Discuss the upcoming coordination meeting for the new project phase.",
      replies: [
        {
          id: 11,
          author: "Jane Smith",
          content: "Looking forward to the meeting. What’s the agenda?",
          replies: [
            {
              id: 111,
              author: "John Doe",
              content: "The agenda will be shared in the meeting invite."
            }
          ]
        },
        {
          id: 12,
          author: "Michael Johnson",
          content: "Can we include budget discussions in the agenda?"
        }
      ]
    },
    {
      id: 2,
      title: "Resource Allocation for Water Management",
      author: "Emily Clark",
      content: "We need to finalize the allocation of resources for the water management project.",
      replies: [
        {
          id: 21,
          author: "David Wilson",
          content: "Are there any updates on the budget allocation?",
          replies: [
            {
              id: 211,
              author: "Emily Clark",
              content: "The budget details will be available next week."
            }
          ]
        }
      ]
    }
  ];
  
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    // Implement post submission logic
    setNewPost("");
  };

  const renderReplies = (replies) => (
    <div className="ms-4">
      {replies.map((reply) => (
        <div key={reply.id} className="mb-3 border p-3 rounded">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">{reply.author}</span>
            <div className='d-flex gap-3'>
                <FontAwesomeIcon icon={faReply} />             
                <FontAwesomeIcon icon={faEdit} />
                <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
          <p className="mt-2">{reply.content}</p>
          {reply.replies && renderReplies(reply.replies)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="container my-4">
      <header className="mb-4">
        <h2>Discussion Forum</h2>
        <textarea
          className="form-control mb-2"
          rows="4"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write a new post..."
        />
        <button className="btn btn-primary" onClick={handlePostSubmit}>
          Post
        </button>
      </header>

      <div className="list-group">
        {discussions?.map((post) => (
          <div key={post.id} className="list-group-item border-0 mb-3 rounded">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-1">{post.title}</h5>
              <small className="text-muted">by {post.author}</small>
            </div>
            <p className="mt-2">{post.content}</p>
            <button className="btn btn-outline-primary btn-sm me-2">
              <FontAwesomeIcon icon={faReply} /> Reply
            </button>
            {/* Add edit and delete functionality if needed */}
            <button className="btn btn-outline-secondary btn-sm me-2">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button className="btn btn-outline-danger btn-sm">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            {post.replies && renderReplies(post.replies)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;
