const express = require('express');

const router = express.Router();
const blogsControllers = require('../controllers/blogscontrollers');
const { tokenExtractor, userExtractor } = require('../utils/middleware');

router.get('/', blogsControllers.getBlogs);
router.get('/:blogId', blogsControllers.getBlogById);
router.get('/:blogId/comments', blogsControllers.getCommentsByBlogId);
router.use(tokenExtractor);
router.use(userExtractor);
router.post('/:blogId/comments', blogsControllers.createCommentforBlog);
router.post('/', blogsControllers.createBlog);
router.delete('/:id', blogsControllers.deleteBlog);
router.put('/:id', blogsControllers.updateLikes);

module.exports = router;
