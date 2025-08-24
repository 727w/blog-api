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

export { getAllPost, getPostDetail, getAllComments, login, signup, logout };
