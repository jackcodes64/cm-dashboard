
const { Post } = require('../models');

exports.getAllPosts = async (req, res) => {
  try {
    const { category } = req.query;
    console.log("The category is:", category);

    let posts;

    if (category === "trending") {
      posts = await Post.findAll({ order: [['created_at', 'DESC']], limit: 4 });
    } else if (category === "campusNews") {
      posts = await Post.findAll({ order: [['created_at', 'DESC']], limit: 10 });
    } else if (category === "popular") {
      posts = await Post.findAll({ order: [['views', 'DESC']], limit: 6 });
    } else {
      const whereClause = category ? { category } : {};
      posts = await Post.findAll({
        where: whereClause,
        order: [['created_at', 'DESC']],
        limit: 10
      });
    }

    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: 'Error retrieving posts', error: err });
  }
};

exports.createPost = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      writer,
      imagelink,
      contentlink,
      content,
      views,
      likes,
      userId
    } = req.body;

    if (!title || !slug ) {
      return res.status(400).json({ error: 'Title, slug are required.' });
    }

    const post = await Post.create({ 
      title,
      slug,
      category,
      writer,
      imagelink,
      views: views || 0,
      likes: likes || 0
    });
      
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    await post.update(updatedData);
    res.json({ message: 'Post updated successfully.', post });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Error updating post', error: err });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    await post.destroy();
    res.json({ message: 'Post deleted successfully.' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Error deleting post', error: err });
  }
};
