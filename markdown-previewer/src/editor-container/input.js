import React, { Component } from 'react';
import marked from 'marked';
import txt from '../redux/react-redux';

//Set marked Options
marked.setOptions({
	renderer: new marked.Renderer(),
	pedantic: false,
	gfm: true,
	tables: true,
	breaks: true,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	xhtml: true
});

class InputTextArea extends Component {
	constructor(props) {
		super(props);
		this.state = { value: txt };
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e) {
		e.preventDefault();
		this.setState({ value: e.target.value });
		let parsedText = marked(e.target.value);
		this.props.submitNewInput(parsedText);
	}
	handleClick(e) {
		e.preventDefault();
		this.setState({ value: '' });
	}
	render() {
		return (
			<div id="editor-container">
				<div id="clear-b">
					<button  onClick={this.handleClick}>Clear</button>
				</div>
				<textarea id="editor" name="editor" value={this.state.value} onChange={this.handleChange}  type="text" />
			</div>
		);
	}
}

export default InputTextArea;