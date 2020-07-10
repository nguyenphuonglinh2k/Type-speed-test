import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';

import { Container } from 'reactstrap';

import './Play.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ParagraphContext } from "../context/Paragraph";

function Play(props) {
  const { rightString, addString} = useContext(ParagraphContext);
  const { randomStr } = props;

  let [ countdown, setCountDown ] = useState(60);
  let [ count, setCount ] = useState(0);
  let [ visable, setVisable ] = useState(false);
  let [ inputValue, setInputValue ] = useState('');

  let inputElement = React.createRef();

  function onChangeInputValue(e) {
    let text = document.getElementById('paragraph');
    let compareValue = randomStr.slice(rightString.length, rightString.length + e.target.value.length);
    let valueRemain = randomStr.slice(rightString.length + e.target.value.length);

    e.preventDefault();
    setInputValue(e.target.value);

    if (e.target.value === compareValue) {
      let valueIsGreen = randomStr.slice(0, rightString.length + e.target.value.length);
      let lastCompareValue = compareValue.slice(-1);

      text.innerHTML = `<span class='green'>${valueIsGreen}</span><span>${valueRemain}</span>`;

      if (lastCompareValue === ' ') {
        addString(compareValue);
        setInputValue('');
      }
    } else {
        for (var i = 0; i < compareValue.length; i++) {
          if (e.target.value[i] !== compareValue[i])
            break;
        }

        setCount(count + 1);

        let valueIsGreen = randomStr.slice(0, rightString.length + i);
        let valueIsRed = compareValue.slice(i);

        text.innerHTML = `<span class='green'>${valueIsGreen}</span><span class='red'>${valueIsRed}</span><span>${valueRemain}</span>`;
    }
  }

  useEffect(() => {
    let timerInterval;
    let intervalCountdown;
  
    setTimeout(() => {
      inputElement.current.focus();
      setTimeout(() => {
        setVisable(true);
      }, 60000);

      intervalCountdown = setInterval(() => {
        setCountDown(countdown => countdown - 1);
      }, 1000);
      
    }, 5000);

    Swal.fire({
      title: 'Get ready to race!',
      html: '<b></b> ms',
      timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    });

    return () => clearInterval(intervalCountdown);
  }, []);

  return (
    <div className="Play">
      { visable === false && 
        <Container className="try-play">
            <div>
              <img src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2Ffrog-car.png?v=1593966757538" />
            </div>
            <div>
              <img src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2Ffrog-logo-icon-design-template_7492-151.svg?v=1594021113045" />
              <img className="margin-left" src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2Ffrog-logo-icon-design-template_7492-151.svg?v=1594021113045" />
              <img className="margin-left" src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2Ffrog-logo-icon-design-template_7492-151.svg?v=1594021113045" />
              <img className="margin-left" src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2Ffrog-logo-icon-design-template_7492-151.svg?v=1594021113045" />
              <img className="margin-left" src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2Ffrog-logo-icon-design-template_7492-151.svg?v=1594021113045" />
              <img className="margin-left" src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2Ffrog-logo-icon-design-template_7492-151.svg?v=1594021113045" />
            </div>
            <div>
              <div id="paragraph">{randomStr}</div>
              <span>
                <input 
                  ref={inputElement} 
                  value={inputValue} 
                  onChange={e => onChangeInputValue(e)}
                  type="text" 
                  placeholder="Type here..."
                />
              </span>
            </div>
            <div className="countdown">
              {countdown} sec
            </div>
        </Container>
      }
      { visable === true && 
        <Container className="result">
          <div>
            <img src="https://cdn.glitch.com/af45ea57-cc17-431c-a29e-191393077cfe%2F1F438-frog-512.png?v=1594199559549" alt="congrats" />
          </div>
          <div className="congrat">&#127804; Good job &#127804;</div>
          <div className="result-grid">
            <div>
              <span>60</span>
              <span>SEC</span>
            </div>
            <div>
              <span>{ Math.round(rightString.length / 5) }</span>
              <span>WPM</span>
            </div>
            <div>
              <span>{ count === 0 ? 100 : Math.floor((rightString.length - count) * 100 / rightString.length) }</span>
              <span>% ACCURACY</span>
            </div>
          </div>
            <button onClick={() => window.location.reload(true)}>TRY AGAIN</button>
        </Container>
      }
    </div>
  );
}

export default Play;
