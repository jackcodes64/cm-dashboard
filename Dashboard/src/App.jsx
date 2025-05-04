import { useState } from "react";
import { useEffect } from 'react';
import './App.css'
import PostList from "../components/PostLists.jsx"
import BugsList from "../components/BugsList.jsx";
import Login from "./login.jsx";
import UsersList from "../components/UsersList.jsx";
import PermissionGate from "../components/permitGate.jsx";

function App() {
  const [section, setSection] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(status);
  }, []);
  const userId = localStorage.getItem('userId');

  return isLoggedIn ? (<>
    <header>
    <h2>CR DASHBOARD</h2>
    <div className='buttons'>
    <PermissionGate userId={userId} action="read" resource="post">
  {(allowed) => (
    <button
      onClick={() => setSection("posts")}
      disabled={!allowed}
      style={{
        opacity: allowed ? 1 : 0.4,
        cursor: allowed ? 'pointer' : 'not-allowed'
      }}>
      POSTS
    </button>
  )}
</PermissionGate>

<PermissionGate userId={userId} action="read" resource="sendEmail">
  {(allowed) => (
    <button
      onClick={() => setSection("users")}
      disabled={!allowed}
      style={{
        opacity: allowed ? 1 : 0.4,
        cursor: allowed ? 'pointer' : 'not-allowed'
      }}>
      USERS
    </button>
  )}
</PermissionGate>

<PermissionGate userId={userId} action="read" resource="debugPage">
  {(allowed) => (
    <button
      onClick={() => setSection("bugs")}
      disabled={!allowed}
      style={{
        opacity: allowed ? 1 : 0.4,
        cursor: allowed ? 'pointer' : 'not-allowed'
      }}>
      BUGS
    </button>
  )}
</PermissionGate>
    </div>
    </header>

    <main>
      {section === "home" && (<div className="nothingness">
        <h1>Welcome to the CR Dashboard</h1>
        <p>Click the buttons above to navigate through the sections.</p>
      </div>)}
      {section === "posts" && <PostList />}
      {section === "users" && <UsersList />}
      {section === "bugs" && <BugsList />}
    </main>
    
  </>) : <Login onLogin={() => setIsLoggedIn(true)} />;
  
}

export default App;
