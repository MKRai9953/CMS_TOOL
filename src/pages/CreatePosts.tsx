import { Slide, toast } from "react-toastify";
import { sanitizeInput, validateAlphanumeric } from "../utils/ValidationUtils";
import { createPost } from "../features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "../hooks/Hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CreatePosts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const { id } = useParams();
  const { items: posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const isEdit = Boolean(id);
  const existingPost = posts.find((p) => p.id === Number(id));

  useEffect(() => {
    if (isEdit && existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.body);
    }
  }, [id, existingPost, isEdit]);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prevPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    const titleValidation = validateAlphanumeric(title);
    const contentValidation = validateAlphanumeric(content);

    setTitleError(titleValidation);
    setContentError(contentValidation);

    if (titleValidation || contentValidation) {
      toast("Please fix the errors before submitting.", {
        transition: Slide,
        type: "error",
      });
      return;
    }

    const newPost = {
      title: sanitizeInput(title),
      body: sanitizeInput(content),
      userId: 1,
    };

    try {
      const result = await dispatch(createPost(newPost)).unwrap();

      toast("Your Post has been Created ✅", { transition: Slide });

      localStorage.setItem("posts", JSON.stringify([result, prevPosts]));

      setTitle("");
      setContent("");
      setTitleError(null);
      setContentError(null);
    } catch (err) {
      toast(`Something went wrong creating the post ❌ ${err}`, {
        transition: Slide,
        type: "error",
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📝 Create a New Post</h2>
      <form onSubmit={handlePostSubmit} className="mb-6 space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Post Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTitleError(validateAlphanumeric(title))}
            type="text"
            placeholder="Post Title"
            className="w-full px-4 py-2 border rounded"
            required
          />
          {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Post Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setContentError(validateAlphanumeric(content))}
            placeholder="Post Content"
            className="w-full px-4 py-2 border rounded"
            rows={5}
            required
          />
          {contentError && (
            <p className="text-red-500 text-sm">{contentError}</p>
          )}
        </div>

        <button
          type="submit"
          className={`bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 hover:cursor-pointer`}
        >
          Publish
        </button>
      </form>
    </div>
  );
};
export default CreatePosts;
