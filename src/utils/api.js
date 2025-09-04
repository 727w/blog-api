const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function login(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  return res;
}

async function getCurrentUser() {
  const res = await fetch(`${BASE_URL}/auth/current-user`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
}

async function logout() {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return res;
}

async function signup(username, password) {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return res.json();
}

async function getAllPost() {
  const response = await fetch(`${BASE_URL}/post/all`);
  const data = await response.json();
  return data;
}

async function getUserPosts() {
  const res = await fetch(`${BASE_URL}/user/posts`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}

async function getPostDetail(id) {
  const response = await fetch(`${BASE_URL}/post/detail/${id}`);
  const data = await response.json();
  return data;
}

async function getAllComments(id) {
  const response = await fetch(`${BASE_URL}/post/detail/${id}/comments`);
  const data = await response.json();
  return data;
}

async function getUserComments() {
  const response = await fetch(`${BASE_URL}/user/comments`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }
  return response.json();
}

async function postArticle(title, content, image) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("image", image);

  const response = await fetch(`${BASE_URL}/post/new`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return response.json();
}

async function postComment(id, content) {
  const res = await fetch(`${BASE_URL}/post/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
    credentials: "include",
  });

  return res.json();
}

export {
  getAllPost,
  getPostDetail,
  getAllComments,
  getUserComments,
  login,
  signup,
  logout,
  postArticle,
  getCurrentUser,
  getUserPosts,
  postComment,
};
