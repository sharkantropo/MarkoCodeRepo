import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Menu extends React.Component
{
    render()
    {
        return(
        <ul><h1>React App local compilation</h1>
            <li><a href="React by example/frontpage.html">React by example App</a></li>
            <li>Others</li>
        </ul>);
    }
}

ReactDOM.render(<Menu />, document.getElementById('root'));
