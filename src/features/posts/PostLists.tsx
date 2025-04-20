import React, { useEffect, useState } from "react";
import { getPosts } from "./postSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/Hooks";
import { postType } from "./postTypes";
import PostList from "./PostList";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

interface PostListsProps {
  buttonClick: (e: React.SyntheticEvent, id: number) => void;
}

const PostLists: React.FC<PostListsProps> = ({ buttonClick }) => {
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<postType[]>([]);
  const { items, error, loading } = useAppSelector((state) => state.posts);

  const navigate = useNavigate();
  useEffect(() => {
    try {
      const cached = JSON.parse(
        localStorage.getItem("posts") || "[]"
      ) as postType[];

      if (cached.length > 0) {
        setPosts(cached);
      } else {
        dispatch(getPosts());
      }
    } catch (e) {
      console.error("Invalid localStorage posts data", e);
      dispatch(getPosts());
    }
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      setPosts(items);
      localStorage.setItem("posts", JSON.stringify(items));
    }
  }, [items]);

  const handlePostClick = (post: postType) => {
    navigate(`/user/edit/${post.id}`);
  };
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {loading === "loading" && <Loader />}
      {error && <p className="text-red-600">{error}</p>}
      <ul className="space-y-3 h-[500px] overflow-y-scroll">
        {posts.length > 0 &&
          posts?.map((post: postType) => (
            <PostList
              key={post.id}
              post={post}
              buttonClick={buttonClick}
              editClick={handlePostClick}
            />
          ))}
      </ul>
    </div>
  );
};

export default PostLists;
