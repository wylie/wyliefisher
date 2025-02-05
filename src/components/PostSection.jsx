import { useEffect, useState } from "react";
import "../style/global.css";
import "../style/posts.css";

const PostSection = (props) => {
  const { posts } = props;

  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  return (
    <section>
      <ul className="post-list">
        {filteredPosts.map((post, postIndex) => (
          <li className="post-list-item" key={postIndex}>
            {<a className="post-link" href={`/blog/${post.slug}/`}>
              <h3 className="title">
                {post.data.title}
              </h3>
            </a>}
            {<p className="date">
              {post.data.pubDate.toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>}
            {<p className="snippet">
              {post.data?.snippet}...&nbsp;
              <a
                href={`/blog/${post.slug}/`}
                className="continue-link"
              >
                continue reading
              </a>
            </p>}

          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostSection;
