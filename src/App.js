import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TodoList from './components/TodoList';
import ChatRoom from './components/ChatRoom';
import { Route } from 'react-router';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div>
						<div id="nav_wrapper">
							<Link to={'/todolist'}>Home</Link>
							<Link to={'/chatroom'}>ChatRoom</Link>
						</div>
						<Route path="/todolist" component={TodoList} />
						<Route path="/chatroom" component={ChatRoom} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
