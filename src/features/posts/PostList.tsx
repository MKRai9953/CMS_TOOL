import React, { useState } from "react";
import { postType } from "./postTypes";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

interface PostListProps {
  post: postType;
  buttonClick: (e: React.SyntheticEvent, id: number) => void;
  editClick?: (post: postType) => void;
}

const PostList: React.FC<PostListProps> = ({
  post,
  buttonClick,
  editClick,
}) => {
  const [showPost, setShowPost] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setShowPost(true);
    navigate(`./${post.id}`);
  };

  const handleBtnAction = () => {
    setShowPost(false);
    navigate("./");
  };

  const buttons = [
    {
      key: "delete",
      label: "Delete",
      onClick: (e: React.SyntheticEvent) => {
        e.stopPropagation();
        buttonClick(e, post.id);
      },
      className: "text-sm text-red-600 hover:text-red-800",
    },
    {
      key: "edit",
      label: "Edit",
      onClick: (e: React.SyntheticEvent) => {
        e.stopPropagation();
        editClick?.(post);
      },
      className: "text-sm text-blue-600 hover:text-blue-800",
    },
  ];

  return (
    <>
      <li
        className="group relative mb-4 bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100 transition"
        onClick={handleClick}
      >
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p>{post.body}</p>

        <div className="mt-2 flex gap-4">
          {buttons.map((btn) => (
            <button
              key={btn.key}
              onClick={btn.onClick}
              className={`${btn.className} opacity-0 group-hover:opacity-100 transition`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </li>

      {showPost && (
        <Modal isOpen={showPost} btnAction={handleBtnAction} showFooter={false}>
          <div>
            <h1 className="text-red-800 font-semibold border-b">
              {post.title}
            </h1>
            <span className="mt-4 block">{post.body}</span>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PostList;
