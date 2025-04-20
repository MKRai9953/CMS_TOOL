import axios from "axios";
import { postType } from "./postTypes";

const API_URL: string = import.meta.env.VITE_BASE_URL;

export const fetchPosts = () => axios.get(API_URL);
export const addPost = (post: {
  userId: number;
  body: string;
  title: string;
}) =>
  axios.post(API_URL, post, {
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
export const updatePost = (id: number, post: postType) =>
  axios.put(`${API_URL}/${id}`, post);
export const deletePost = (id: number) => axios.delete(`${API_URL}/${id}`);
