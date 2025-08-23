const BASE_URL = "http://localhost:8080/api";

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

export { getAllPost, getPostDetail, getAllComments };
