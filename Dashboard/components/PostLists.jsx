import React, { useEffect, useState } from 'react';
import axiosInstance from '../lib/axiosInstance';
import PostControlPanel from './postControlPanel';
import './PostList.css';

const PostList = () => {
  const [section, setSection] = useState("home");
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    axiosInstance.get('/posts')
      .then(response => setPosts(response.data))
      .catch(err => console.error(err));
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter
      ? post.category === categoryFilter
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="post-list">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by title"
          className="search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select
          className="category-select"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Academic">Academics</option>
          <option value="Career">Career</option>
          <option value="Technology">Technology</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Elevation">Elevation</option>
        </select>
        <button onClick={()=> setSection("alter")} className="btn delete-btn">Alter Posts</button>
      </div>
        
      <main>
        {section === "home" && (<>{filteredPosts.length > 0 ? (
        <div className="post-grid">
          {filteredPosts.map(post => (
            <div key={post.id} className="post-card">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-writer">By {post.writer}</p>
              <p className="post-category">{post.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
        </>)}
        {section === "alter" && <PostControlPanel searchTerm={searchTerm} posts={posts} />}
      </main>
      
    </div>

  );
};

export default PostList;
