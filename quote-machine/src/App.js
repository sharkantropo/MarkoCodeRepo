import React from 'react';
//import {Component} from 'react';
import { connect } from 'react-redux';
import { createStore } from 'redux';
//import logo from './logo.svg';
//import './App.css';

//Redux
//Define a constant for change quote message action
const CHANGE_QUOTE = 'CHANGE_QUOTE';
// Action, CHANGE_QUOTE triggers store to pick an object from array randomly and return it.
const quoteChanger = quote => ({ type: CHANGE_QUOTE, quote });

const quoteReducer = (state = "default", action) => {
	switch (action.type) {
		case CHANGE_QUOTE:
			{
				return { author: action.quote[0],quote: action.quote[1] };
			}
		default:
			{
				return state;
			}
	}
};

const store = createStore(quoteReducer);

//React
const quotes_array = [{
	'quote': 'Not all those who wander are lost.',
	'author': '― J.R.R. Tolkien'
}, {
	'quote': 'The world is a book and those who do not travel read only one page.',
	'author': '― Augustine of Hippo'
}, {
	'quote': 'The journey of a thousand miles begins with a single step.',
	'author': '― Lao Tzu'
}, {
	'quote': 'Wherever you go becomes a part of you somehow.',
	'author': '― Anita Desai'
}, {
	'quote': 'A good traveler has no fixed plans and is not intent on arriving.',
	'author': '― Lao Tzu'
}, {
	'quote': 'Travel is fatal to prejudice, bigotry, and narrow-mindedness.',
	'author': '― Mark Twain'
}, {
	'quote': 'I travel not to go anywhere, but to go. I travel for travel\'s sake. The great affair is to move.',
	'author': '― Robert Louis Stevenson'
}, {
	'quote': 'It is good to have an end to journey toward; but it is the journey that matters, in the end.',
	'author': '― Ernest Hemingway'
}, {
	'quote': 'The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.', 'author': '― Marcel Proust'
}, {
	'quote': 'I will always be haunted by thoughts of a sun-drenched elsewhere.',
	'author': '― Isabelle Eberhardt'
}, {
	'quote': 'Travel brings power and love back into your life.',
	'author': '― Rumi'
}, {
	'quote': 'The traveler sees what he sees. The tourist sees what he has come to see.',
	'author': '― G.K. Chesterton'
}, {
	'quote': 'I read; I travel; I become.',
	'author': '― Derek Walcott'
}, {
	'quote': 'Every dreamer knows that it is entirely possible to be homesick for a place you\'ve never been to.',
	'author': '― Judith Thurman'
}, {
	'quote': 'Travel makes one modest. You see what a tiny place you occupy in the world.',
	'author': '― Gustave Flaubert'
}, {
	'quote': 'To travel is to live.',
	'author': '― Hans Christian Andersen'
}, {
	'quote': 'there was nowhere to go but everywhere',
	'author': '― Jack Kerouac'
}, {
	'quote': 'Our battered suitcases were piled on the sidewalk again; we had longer ways to go. But no matter, the road is life',
	'author': '― Jack Kerouac'
}, {
	'quote': 'If you reject the food, ignore the customs, fear the religion, and avoid the people, you might better stay home.',
	'author': '― James A. Michener'
}, {
	'quote': 'Make voyages. Attempt them. There\'s nothing else.',
	'author': '― Tennessee Williams'
}, {
	'quote': 'The journey itself is my home.',
	'author': '― Matsuo Bashō'
}, {
	'quote': 'Wherever you go, you take yourself with you.',
	'author': '― Neil Gaiman'
}, {
	'quote': 'Once the travel bug bites there is no known antidote, I know that I shall be happily infected until the end of my life.',
	'author': '― Michael Palin'
}, {
	'quote': 'I didn\'t know that the world could be so mind-blowingly beautiful.',
	'author': '― Justina Chen'
}, {
	'quote': 'I heard an airplane passing overhead. I wished I was on it.',
	'author': '― Charles Bukowski'
}, {
	'quote': 'Never hesitate to go far away, beyond all seas, all frontiers, all countries, all beliefs.',
	'author': '― Amin Maalouf'
}, {
	'quote': 'When in doubt, head to the airport and buy a plane ticket.',
	'author': '― Chris Guillebeau'
}];
const setRandquote = (arr) => 
{
	let pnum = Math.round(Math.random() * (arr.length - 1));
	let chose = arr.filter((quote, index) => index === pnum);
	return [chose[0].author,chose[0].quote];
} 


//Presentational
class Screen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { author: "test", quote: "test" };
		this.handleQuote = this.handleQuote.bind(this);
	}
	handleQuote() {
		this.props.submitNewQuote(this.props.the_quotes);
		this.setState({ author: this.props.quotes.author , quote: this.props.quotes.quote });
	}
	render() {
		return (<div>
			<div>
				<p id="text">{this.state.quote}</p>
				<h2 id="author">{this.state.author}</h2>
			</div>
			<a id="tweet-quote" href="https://www.google.com/">Link</a>
			<button id="new-quote" onClick={this.handleQuote}>New Quote</button>
		</div>
		);
	}
}

//React-Redux
const mapStateToProps = (state) => { return { quotes: state }; };
const mapDispatchToProps = (dispatch) => {
	return {
		submitNewQuote: (newQuote) => 
		{
			let pick=setRandquote(newQuote);
			dispatch(quoteChanger(pick));
		}
	};
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Screen);

export  {Container,store,quotes_array};
