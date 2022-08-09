import Togglable from "./Togglable";

const Blog = ({ blogs, blogService, sortByLikes }) => {
  return (
    <div className="blog">
      <button onClick={sortByLikes}>Sort by likes</button>
      {blogs.map((blog) => (
        <div>
          {blog.title} by {blog.author}
          <Togglable showButtonLabel="show more" hideButtonLabel="hide">
            <ul>
              <li>
                {blog.likes}
                <button
                  onClick={async () => await blogService.update(blog._id, blog)}
                >
                  like
                </button>
              </li>
              <li>{blog.url}</li>
              <li>{blog.username}</li>
              <button
                onClick={async () => await blogService.remove(blog._id, blog)}
              >
                Delete
              </button>
            </ul>
          </Togglable>
        </div>
      ))}
    </div>
  );
};

export default Blog;
