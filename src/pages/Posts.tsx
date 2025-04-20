import { useAppDispatch } from "../hooks/Hooks";
import { removePost } from "../features/posts/postSlice";
import { useRef, useState } from "react";
import Modal from "../components/Modal";
import PostLists from "../features/posts/PostLists";
import { Slide, toast } from "react-toastify";
import { postType } from "../features/posts/postTypes";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const idRef = useRef<number | null>(null);

  const handleButtonClick = (e: React.SyntheticEvent, id: number) => {
    e.stopPropagation();
    idRef.current = id;
    setIsModalOpen(true);
  };

  const modalBtnAction = (action: "Action" | "Cancel") => {
    if (action === "Action") {
      dispatch(removePost(idRef.current as number));
      toast("Deleted post Sucessfully", {
        transition: Slide,
      });
      const currentPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      const updatedPosts = currentPosts.filter(
        (post: postType) => post.id !== (idRef.current as number)
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
    setIsModalOpen(false);
    idRef.current = null;
  };

  return (
    <>
      <div className="flex-1 flex">
        <main className="flex-1 p-6">
          <h3 className="text-xl font-semibold mb-2">🗂 All Posts</h3>
          <PostLists buttonClick={handleButtonClick} />
        </main>
      </div>
      {isModalOpen && (
        <Modal
          btnAction={modalBtnAction}
          isOpen={isModalOpen}
          modalText="Are you Sure, You want to delete this?"
        />
      )}
    </>
  );
};

export default Posts;
