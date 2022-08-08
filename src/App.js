import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateNewBlog from "./components/CreateNewBlog";
import Message from "./components/Message";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong Credentials");
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const blogFormRef = useRef();

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} setMessage={setMessage} />
      {user === null ? (
        <Togglable buttonLabel="login">
          <Login
            setPassword={setPassword}
            password={password}
            setUsername={setUsername}
            username={username}
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} is logged in! <button onClick={logout}>Logout</button>
          </p>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <CreateNewBlog
              blogService={blogService}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
              setLikes={setLikes}
              setBlogs={setBlogs}
              setMessage={setMessage}
              message={message}
              title={title}
              author={author}
              url={url}
              likes={likes}
            />
          </Togglable>
          <br />
          <Blog blogs={blogs} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
