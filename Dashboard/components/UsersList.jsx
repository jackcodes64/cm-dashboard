import React, { useEffect, useState } from 'react';
import axiosInstance from '../lib/axiosInstance';
import PermissionGate from './permitGate';
import './UsersList.css';

const UsersList = () => {
  const [Users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axiosInstance.get('/newsletter')
      .then(response => {
        const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUsers(sorted);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/newsletter/${id}`);
        alert('Subscriber deleted successfully.');
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Email', 'Date Joined'],
      ...Users.map(user => [user.id, user.email, new Date(user.createdAt).toLocaleString()])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'users.csv';
    link.click();
  };

  const filteredUsers = Users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="User-wrapper">
      <div className="user-top">
        <h2 className='nothingness'>NEWSLETTER SUBSCRIBERS</h2>
        <div className='search-export'>
        <input
          type="text"
          placeholder="Search email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="user-search"
        />
        <button className="export-btn" onClick={handleExport}>Export CSV</button>
        </div>
        
      </div>

      {filteredUsers.length === 0 ? (
        <p className='nothingness'>No Users yet.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th className="id-header"></th>
              <th className="email-header">EMAIL</th>
              <th className="date-header">DATE JOINED</th>
              <th className="action-header">ACTION</th>
            </tr>
          </thead>
          <tbody>
          {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="id-cell">{index + 1}</td>
                <td className="email-cell">{user.email}</td>
                <td className="date-cell">{new Date(user.createdAt).toLocaleString()}</td>
                <td className="action-cell">
          <PermissionGate userId={localStorage.getItem('userId')} action="delete" resource="sendEmail">
              {(allowed) => (
              <button className="delete-btn"  onClick={() => handleDelete(user.id)}
                disabled={!allowed}
                style={{
                  opacity: allowed ? 1 : 0.4,
                  cursor: allowed ? 'pointer' : 'not-allowed'
                }}>Delete</button> )}           
              </PermissionGate>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;