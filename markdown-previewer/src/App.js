import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputTextArea from './editor-container/input'
import OutputTextArea from './previewer-container/output'
import { mapStatetoProps, mapDispatchtoProps } from './redux/react-redux'
import './app.css';


//Main component 
class App extends Component {
	constructor(props) {
		super(props);
		this.state = { pick: 'prev' };
		this.handlePick = this.handlePick.bind(this);
	}

	handlePick(e) {
		this.setState({ pick: e.target.value });
	}
	render() {
		return (
			<div id="main-app">
				<h1>My Markdown Previewer</h1>
				<div id="app-container">
					<div id="toolbar">
						<select value={this.state.value} onChange={this.handlePick}>
							<option selected value="prev">Flavored preview</option>
							<option value="src">HTML source</option>	
						</select>
					</div>
					<ReduxInputContainer />
					<div id="output-container">
						<ReduxOutputContainer picked={this.state.pick} />
					</div>
				</div>
			</div>
		);
	}
}

// connected containers
const ReduxInputContainer = connect(mapStatetoProps, mapDispatchtoProps)(InputTextArea);
const ReduxOutputContainer = connect(mapStatetoProps, null)(OutputTextArea);

export default App;
