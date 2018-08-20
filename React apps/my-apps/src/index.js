import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

let data =
	[{
		"when": `2 minutes ago`,
		"who": `Jill Dupre`,
		"description": `Created new account`
	},
	{
		"when": `1 hour ago`,
		"who": `Lose White`,
		"description": `Added fist chapter`
	},
	{
		"when": `2 hours ago`,
		"who": `Jordan Whash`,
		"description": `Created new account`
	}], headings = [`Last change`, `by author`, `Summary`];

const props = { headings: headings, changeSets: data };

class Headings extends React.Component {
	render() {
		const headings = this.props.headings.map(function (heading, index) {
			return (<Heading key={index} heading={heading} />);
		});
		return <thead><tr>{headings}</tr></thead>;
	}
}

class Heading extends React.Component {
	render() {
		/* This is a comment */
		var headingStyle = { backgroundColor: `FloralWhite`, fontSize: `19px` };
		return (<th style={headingStyle}>{this.props.heading}</th>);
	}
}

class Row extends React.Component {
	render() {
		var trStyle = { backgroundColor: `aliceblue` };
		return (<tr style={trStyle}>
			<td>{this.props.changeSet.when}</td>
			<td>{this.props.changeSet.who}</td>
			<td>{this.props.changeSet.description}</td>
		</tr>);
	}
}


class Rows extends React.Component {
	render() {
		const rows = this.props.changeSets.map(function (changeSet, index) {
			return (<Row key={index} changeSet={changeSet} />);
		});
		return (<tbody>{rows}</tbody>);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Recent changes</h1>
				<table>
					<Headings headings={this.props.
						headings} />
					<Rows changeSets={this.props.
						changeSets} />
				</table>
			</div>);
	}
}

App.propTypes =
	{
		headings: props.headings.array,
		changeSets: props.changeSets.array
	};

Rows.propTypes =
	{
		changeSets: props.changeSets.array
	};

Row.propTypes =
	{
		changeSet: props.changeSets.array
	};

Heading.propTypes =
	{
		heading: props.headings.array
	};

Headings.propTypes =
	{
		headings: props.headings.array
	};

ReactDOM.render(<App {...props} headings={[`Updated at `, `Author`, `Change`]} />, document.getElementById(`container`));