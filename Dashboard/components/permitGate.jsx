import { useState, useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';

const PermissionGate = ({ userId, action, resource, children }) => {
  const [allowed, setAllowed] = useState(null); // null to indicate loading

  useEffect(() => {
    axiosInstance.post('/permissions', { userId, action, resource })
      .then(res => {
        setAllowed(res.data.allowed);
      })
      .catch(err => {
        console.error("Permission check failed:", err);
        setAllowed(false); // deny by default on error
      });
  }, [userId, action, resource]);

  if (allowed === null) return null; // or a loading indicator

  return typeof children === 'function' ? children(allowed) : children;
};

export default PermissionGate;