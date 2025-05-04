import React, { useState, useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';
import './PostList.css';

const PostControlPanel = ({ searchTerm, posts }) => {
  const [mode, setMode] = useState('make');
  const [postData, setPostData] = useState({
    title: '',
    writer: '',
    category: '',
    slug: '',
    imagelink: '',
    created_at: '',
  });

  useEffect(() => {
    if ((mode === 'modify' || mode === 'delete') && searchTerm.trim()) {
      const matchedPost = posts.find(
        post => post.title.toLowerCase() === searchTerm.toLowerCase()
      );
      if (matchedPost) {
        setPostData({ ...matchedPost });
      } else {
        // Reset if no match
        setPostData({
          title: '',
          writer: '',
          category: '',
          slug: '',
          imagelink: '',
          created_at: '',
        });
      }
    }
  }, [searchTerm, mode, posts]);

  const handleInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (mode === 'make') {
        const { title, writer, category, slug, imagelink } = postData;
        const postDataToSend = { title, writer, category, slug,
           imagelink,  created_at: new Date().toISOString() };
        console.log("Submitting:", postDataToSend);//debug  
        await axiosInstance.post('/posts', postDataToSend);
        alert('Post created successfully.');
      } else if (mode === 'modify') {
        if (!postData.id) return alert('Post not found.');
        await axiosInstance.put(`/posts/${postData.id}`, postData);
        alert('Post updated successfully.');
      } else if (mode === 'delete') {
        if (!postData.id) return alert('Post not found.');
        await axiosInstance.delete(`/posts/${postData.id}`);
        alert('Post deleted successfully.');
        setPostData({
          title: '',
          writer: '',
          category: '',
          slug: '',
          imagelink: '',
          created_at: ''
        });
      }
    } catch (error) {
      console.error('Error performing action:', error);
      alert('Something went wrong.');
    }
  };

  const timeValue = postData.created_at && !isNaN(new Date(postData.created_at))
  ? new Date(postData.created_at).toLocaleString()
  : new Date().toLocaleString();

  return (
    <div className="post-panel">
      <div className="action-bar">
        <button onClick={() => setMode('make')} className={mode === 'make' ? 'active' : ''}>Make Post</button>
        <button onClick={() => setMode('delete')} className={mode === 'delete' ? 'active' : ''}>Delete Post</button>
        <button onClick={() => setMode('modify')} className={mode === 'modify' ? 'active' : ''}>Modify Post</button>
      </div>

      {(mode === 'delete' || mode === 'modify') && (
        <p className="search-preview">Searching for post titled: <strong>{searchTerm || '...'}</strong></p>
      )}

      <div className="form-section">
        <label>
          Title:
          <input type="text" name="title" value={postData.title} onChange={handleInputChange} />
        </label>
        <label>
          Writer:
          <input type="text" name="writer" value={postData.writer} onChange={handleInputChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={postData.category} onChange={handleInputChange} />
        </label>
        <label>
          Slug:
          <input type="text" name="slug" value={postData.slug} onChange={handleInputChange} />
        </label>
        <label>
          Image Link:
          <input type="text" name="imagelink" value={postData.imagelink} onChange={handleInputChange} />
        </label>
        <label>
          Time:
          <input
            type="text"
            name="created_at"
            value={timeValue}
            readOnly={mode === 'make'}
          />
        </label>
        <button onClick={handleSubmit} className="submit-btn">
          {mode === 'make' ? 'Post' : mode === 'modify' ? 'Update' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default PostControlPanel;

