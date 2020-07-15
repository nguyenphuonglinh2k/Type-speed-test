import React, { useEffect, useState, useContext } from "react";
import { LoremIpsum } from "lorem-ipsum";

import { ParagraphContext } from "../../contexts/Paragraph";
import CountDown from "../CountDown";
import Result from "../result/Result";

import { Container } from "reactstrap";

import "./Play.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Play(props) {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 6
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  const { rightString, addString } = useContext(ParagraphContext);
  const [randomStr, setRandomStr] = useState(lorem.generateParagraphs(1));
  const [countdown, setCountDown] = useState(60);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [height, setHeight] = useState(0);

  let inputElement = React.createRef();

  function onChangeInputValue(e) {
    let text = document.getElementById("paragraph");

    let compareValue = randomStr.slice(
      rightString.length,
      rightString.length + e.target.value.length
    );
    let valueRemain = randomStr.slice(
      rightString.length + e.target.value.length
    );

    e.preventDefault();
    setInputValue(e.target.value);

    if (e.target.value === compareValue) {
      let valueIsGreen = randomStr.slice(
        0,
        rightString.length + e.target.value.length
      );
      let lastCompareValue = compareValue.slice(-1);

      text.innerHTML = `<span id="textScroll" class='green'>${valueIsGreen}</span><span>${valueRemain}</span>`;

      if (lastCompareValue === " ") {
        addString(rightString + compareValue);
        setInputValue("");
      }
    } else {
      for (var i = 0; i < compareValue.length; i++) {
        if (e.target.value[i] !== compareValue[i]) break;
      }

      setCount(count + 1);

      let valueIsGreen = randomStr.slice(0, rightString.length + i);
      let valueIsRed = compareValue.slice(i);

      text.innerHTML = `<span id="textScroll" class='green'>${valueIsGreen}</span><span class='red'>${valueIsRed}</span><span>${valueRemain}</span>`;
    }

    let textScroll = document.getElementById("textScroll");

    if (text.scrollTop + 39 < textScroll.offsetHeight) {
      text.scrollTop += 35;
      setHeight(height => textScroll.offsetHeight);
    }

    if (height > textScroll.offsetHeight) {
      text.scrollTop -= 35;
      setHeight(height => textScroll.offsetHeight);
    }
  }

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        inputElement.current.focus();

        setTimeout(() => {
          setVisible(true);
          setRandomStr(lorem.generateParagraphs(1));
          setInputValue("");
        }, 60000);
      }, 5000);
    }
  }, [visible]);

  return (
    <div className="Play">
      {!visible && (
        <Container className="try-play">
          <div>
            <img src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2F124-1246356_true-frog-mylove.png?v=1594658272314" />
          </div>
          <div className="line-race" />
          <div>
            <div id="paragraph">{randomStr}</div>
            <div>
              <input
                ref={inputElement}
                value={inputValue}
                onChange={e => onChangeInputValue(e)}
                type="text"
                placeholder="Type here..."
              />
            </div>
          </div>
          <CountDown
            visible={visible}
            countdown={countdown}
            setCountDown={setCountDown}
          />
        </Container>
      )}
      {visible && (
        <Result
          setCountDown={setCountDown}
          setVisible={setVisible}
          count={count}
        />
      )}
    </div>
  );
}

export default Play;
