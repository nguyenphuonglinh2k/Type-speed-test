import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LoremIpsum } from "lorem-ipsum";

import Home from './components/Home';
import Play from './components/Play';
import { ParagraphProvider } from "./context/Paragraph";

import './App.css';

function App() {
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

  return (
    <ParagraphProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/play" exact>
              <Play randomStr={lorem.generateParagraphs(1)}/>
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ParagraphProvider>
  );
}

export default App;
