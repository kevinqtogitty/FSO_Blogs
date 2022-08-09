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

  const sortByLikes = () => {
    const sortedArray = blogs.map((blog) => blog);
    sortedArray.sort((a, b) => b.likes - a.likes);
    setBlogs(sortedArray);
  };

  const blogFormRef = useRef();

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} setMessage={setMessage} />
      {user === null ? (
        <Togglable showButtonLabel="login" hideButtonLabel="cancel">
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
          <Togglable
            showButtonLabel="New Blog"
            hideButtonLabel="Cancel"
            ref={blogFormRef}
          >
            <CreateNewBlog
              blogService={blogService}
              setBlogs={setBlogs}
              setMessage={setMessage}
              blogFormRef={blogFormRef}
            />
          </Togglable>
          <br />
          <Blog
            blogs={blogs}
            blogService={blogService}
            sortByLikes={sortByLikes}
          />
        </div>
      )}
    </div>
  );
};

export default App;
