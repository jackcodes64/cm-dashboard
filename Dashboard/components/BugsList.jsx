import React, { useEffect, useState } from 'react';
import './BugsList.css';
import axiosInstance from '../lib/axiosInstance';
import PermissionGate from './permitGate.jsx';

const Bugs = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    axiosInstance.get('/errors') 
      .then(response => setBugs(response.data))
      .catch(err => console.error('Error fetching logs:', err));
  }, []);

  //await axiosInstance.put(`/errors/${postData.id}`, postData);
     //   alert('Marked as resolved');
  const handleResolve = async (bugId) => {
    try {
      await axiosInstance.put(`/errors/${bugId}`, { resolved: true });
      setBugs(bugs.filter(bug => bug.id !== bugId));
      alert('Marked as resolved');
    } catch (err) {
      console.error('Error marking bug as resolved:', err);
    }
  }

  return (
    <div className="bugs-wrapper">
      <h2 className='header'>Backend Error Logs</h2>

      {bugs.length === 0 ? (
        <p className='noErrorText'>No errors logged: System Perfect .</p>
      ) : (
        <div className="bugs-list">
          {bugs.map(bug => (
            <div key={bug.id} className="bug-card">
              <h3 className="bug-title">{bug.message}</h3>
              <p className="bug-status">
                Status Code: <strong>{bug.statusCode}</strong>
              </p>
              <p className="bug-method">
                <strong>{bug.method}</strong> {bug.path}
              </p>
              <details className="bug-stack">
                <summary>Stack Trace</summary>
                <pre>{bug.stack}</pre>
              </details>
              <p className="bug-time">
                Logged at: {new Date(bug.createdAt).toLocaleString()}
              </p>
              <PermissionGate userId={localStorage.getItem('userId')} action="delete" resource="debugPage">
              {(allowed) => (
              <button className="resolve-btn"  onClick={() => handleResolve(bug.id)}
                disabled={!allowed}
                style={{
                  opacity: allowed ? 1 : 0.4,
                  cursor: allowed ? 'pointer' : 'not-allowed'
                }}>Mark as Resolved</button> )}           
              </PermissionGate>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bugs;