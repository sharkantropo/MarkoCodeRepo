import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {ReduxScreenContainer,ReduxTwitterLink,ReduxButtonContainer,store,quotes_array} from './App';
import * as serviceWorker from './serviceWorker';

//Presentational

class App extends React.Component{ render() { return(<div id="quote-box" class="container-fluid"> <h1 class="text-primary text-center">TravelQuoteMachine</h1> <ReduxScreenContainer /> <ReduxButtonContainer the_quotes={quotes_array}/> <ReduxTwitterLink /></div>)}};

//Render to DOM
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
