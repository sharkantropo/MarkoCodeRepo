import React from "react";
import ReactDOM from "react-dom";
import "./React-by-example/rebex.css";

class App extends React.Component
{
	render(){
		return (<div>Welcome to Adequate Mike!</div>);
	}
}

ReactDOM.render(<App />, document.getElementById(`root`));