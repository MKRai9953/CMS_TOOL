import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./postAPI";
import { postType } from "./postTypes";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await api.fetchPosts();
  return response.data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post: { title: string; body: string; userId: number }) => {
    const response = await api.addPost(post);
    return response.data;
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, post }: { id: number; post: postType }) => {
    const response = await api.updatePost(id, post);
    return response.data;
  }
);

export const removePost = createAsyncThunk(
  "posts/removePost",
  async (id: number) => {
    await api.deletePost(id);
    return id;
  }
);

interface initialStateProps {
  items: [] | postType[];
  loading: "idle" | "failed" | "successful" | "loading";
  error: string | null;
}

const initialState: initialStateProps = {
  items: [],
  loading: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = "successful";
        state.items = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message as string;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = "successful";
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message as string;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = "successful";
        const index = state.items.findIndex(
          (post: postType) => post.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message as string;
      })
      .addCase(editPost.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.loading = "successful";
        state.items = state.items.filter(
          (post: postType) => post.id !== action.payload
        );
      })
      .addCase(removePost.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message as string;
      })
      .addCase(removePost.pending, (state) => {
        state.loading = "loading";
      });
  },
});

export default postSlice.reducer;
