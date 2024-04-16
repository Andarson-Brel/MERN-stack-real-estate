import apiRequest from "./apiRequest";

export const fetchAllPosts = async (query) => {
  try {
    const res = await apiRequest.get(`/posts?${query}`);
    // console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

export const fetchSinglePost = async (id) => {
  try {
    const res = await apiRequest.get(`/posts/${id}`);

    return res.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
};
export const fetchUserPost = async (userId) => {
  try {
    const res = await apiRequest.get(`/posts/${userId}/posts`);

    return res.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
};
export const fetchSavedPosts = async (userId) => {
  try {
    const res = await apiRequest.get(`/user/${userId}/savedposts`);

    return res.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
};

export const fetchChats = async () => {
  try {
    const res = await apiRequest.get(`/chats`);

    return res.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
};
