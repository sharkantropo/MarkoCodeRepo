import React, { Component } from 'react';
// import  from 'react-redux';

class InputTextArea extends Component
{
	constructor(props) 
	{
		super(props);
		this.handleChange=this.handleChange.bind(this);
	}
	
	handleChange(e)
	{
		// will dispatch event.target.value to store
	}
	
	render() {
		let placehold="placeholder";
		return(<textarea id="editor" name="editor" value={placehold} onChange={this.handleChange} />);
	}
} 