import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo animate-charcter">MyBlog</Link>
      <nav>
        {username && (
          <div>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </div>
        )}
        {!username && (
          <div>
            <Link to="/login" className="under_me text-with-border">Login</Link>
            <Link to="/register" className="under_me text-with-border">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}