import React from "react";

import Routes from "./routes/Routes";
import { ParagraphProvider } from "./contexts/Paragraph";

function App() {
  return (
    <ParagraphProvider>
      <div className="App">
        <Routes />
      </div>
    </ParagraphProvider>
  );
}

export default App;
