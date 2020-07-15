import React, { Component } from "react";

export const ParagraphContext = React.createContext();

export class ParagraphProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rightString: ""
    };

    this.addString = this.addString.bind(this);
  }

  addString(text) {
    this.setState({
      rightString: text
    });
  }

  render() {
    return (
      <ParagraphContext.Provider
        value={{
          rightString: this.state.rightString,
          addString: this.addString
        }}
      >
        {this.props.children}
      </ParagraphContext.Provider>
    );
  }
}
