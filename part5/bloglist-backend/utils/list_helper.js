const dummy = (blogs) => (Array.isArray(blogs) ? 1 : undefined);

// eslint-disable-next-line max-len
const totalLikes = (blogs) => (blogs.length === 0 ? 0 : blogs.map((blog) => blog.likes).reduce((acc, val) => acc + val, 0));

const mostLikedBlog = (blogs) => {
  const likesMax = Math.max(...blogs.map((blog) => blog.likes));
  const blogWithMostLikes = blogs.find((blog) => blog.likes === likesMax);
  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorOccurencies = {};
  // eslint-disable-next-line max-len, no-return-assign
  blogs.forEach((blog) => (authorOccurencies[blog.author] ? authorOccurencies[blog.author] += 1 : authorOccurencies[blog.author] = 1));

  const result = { author: '', blogs: 0 };

  Object.keys(authorOccurencies).forEach((author) => {
    if (authorOccurencies[author] > result.blogs) {
      result.blogs = authorOccurencies[author];
      result.author = author;
    }
  });
  return result;
};

const mostLikes = (blogs) => {
  const authorLikes = {};
  // eslint-disable-next-line max-len, no-return-assign
  blogs.forEach((blog) => (authorLikes[blog.author] ? authorLikes[blog.author] += blog.likes : authorLikes[blog.author] = blog.likes));

  const result = { author: '', likes: 0 };
  Object.keys(authorLikes).forEach((author) => {
    if (authorLikes[author] > result.likes) {
      result.likes = authorLikes[author];
      result.author = author;
    }
  });
  return result;
};

module.exports = {
  dummy, totalLikes, mostLikedBlog, mostBlogs, mostLikes,
};
