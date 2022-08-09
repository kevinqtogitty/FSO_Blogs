import { useState } from "react";

const CreateNewBlog = ({ blogService, setBlogs, setMessage, blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

  const addNewBlog = async () => {
    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.create({ title, author, url, likes });
    setAuthor("");
    setLikes("");
    setUrl("");
    setTitle("");
    setBlogs((current) => [...current, newBlog]);
    setMessage(`${newBlog.title} by ${newBlog.author} has been added`);
    setTimeout(() => setMessage(null), 5000);
  };
  return (
    <div>
      <h1>Create New Blog</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewBlog();
        }}
        className="addBlogForm"
      >
        <label for="title"> Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br />
        <label for="author">Author: </label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <br />
        <label for="url">URL: </label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <br />
        <label for="likes">Likes: </label>
        <input
          type="number"
          id="likes"
          name="likes"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        ></input>
        <br />
        <button type="submit">Add blog</button>
      </form>
    </div>
  );
};

export default CreateNewBlog;
