import React, { Component } from 'react';
import {connect} from 'react-redux';
import InputTextArea from './editor-container/input'
import OutputTextArea from './previewer-container/output'
import {mapStatetoProps,mapDispatchtoProps} from './redux/react-redux'
//import './App.css';

// connected containers
const ReduxInputContainer = connect(mapStatetoProps, mapDispatchtoProps)(InputTextArea);
const ReduxOutputContainer = connect(mapStatetoProps,null)(OutputTextArea);

//Presentational
class App extends Component {
  render() {
    return (
    <div id="main-app">
		<h1>My Markdown Previewer</h1>
		<ReduxInputContainer />
		<ReduxOutputContainer />
	</div>
    );
  }
}

export default App;
