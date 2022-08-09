import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  console.log(newObject);
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const updatedBlog = {
    author: newObject.author,
    likes: newObject.likes + 1,
    title: newObject.title,
    url: newObject.url,
    user: newObject.user,
  };

  const request = axios.put(`${baseUrl}/${id}`, updatedBlog);
  return request.then((response) => response.data);
};

const remove = async (id, object) => {
  if (
    window.confirm(
      `Are you sure you want to delete ${object.title} by ${object.author} ?`
    )
  ) {
    const request = await axios.delete(`${baseUrl}/${id}`);
    return request.data;
  }
};

export default { getAll, setToken, create, update, remove };
