const Blog = ({ blogs, user }) => (
  <div>
    {blogs.map((blog) => (
      <li key={blog.id}>
        {blog.title} by {blog.author}
      </li>
    ))}
  </div>
);

export default Blog;
