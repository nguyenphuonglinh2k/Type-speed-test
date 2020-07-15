import React, { useEffect, useContext } from "react";

import { Container } from "reactstrap";

import { ParagraphContext } from "../../contexts/Paragraph";

import "./Result.css";

function Result(props) {
  const { setVisible, setCountDown, count } = props;
  const { rightString, addString } = useContext(ParagraphContext);

  return (
    <Container className="result">
      <div>
        <img
          src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2F1F438-frog-512.png?v=1594199559549"
          alt="congrats"
        />
      </div>
      <div className="congrat">&#127804; Good job &#127804;</div>
      <div className="result-grid">
        <div>
          <span>60</span>
          <span>SEC</span>
        </div>
        <div>
          <span>{Math.round(rightString.length / 5)}</span>
          <span>WPM</span>
        </div>
        <div>
          <span>
            {count === 0
              ? 100
              : Math.floor(
                  ((rightString.length - count) * 100) / rightString.length
                )}
          </span>
          <span>% ACCURACY</span>
        </div>
      </div>
      <button
        onClick={() => {
          setVisible(false);
          addString("");
          setCountDown(60);
        }}
      >
        TRY AGAIN
      </button>
    </Container>
  );
}

export default Result;
