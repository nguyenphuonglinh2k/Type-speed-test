import React from "react";

import { Link } from "react-router-dom";

import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="Home animate__animated animate__fadeIn">
      <img src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2FUntitled-1.svg?v=1593955960135" />
      <div>Typing Speed Test</div>
      <Link to="/play">
        <button>Start</button>
      </Link>
    </div>
  );
}

export default Home;
