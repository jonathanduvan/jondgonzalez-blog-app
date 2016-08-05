
import React from 'react';
import { Link } from 'react-router';


const NavBar = (props) => {
  return (
    <nav>
      <div className="Heading"> <Link to="/">Gonzalez Blogger</Link>
        <li id="newPost"><Link to="/posts/new">new post</Link></li>
      </div>
    </nav>
  );
};

export default NavBar;
