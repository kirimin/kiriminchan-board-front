import * as React from "react";
import * as ReactDOM from "react-dom";

class Layout extends React.Component {
  render() {
    return (
      <h1>test!</h1>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);