import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class ChatRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messageList: []
		};

		this._handleKeyPress = this._handleKeyPress.bind(this);
	}

	componentDidMount() {
		this._initWebsocket();
	}

	_initWebsocket() {
		console.log('called initWebSocket');
		this.connection = new WebSocket('ws://localhost:3002');
		// listen to onmessage event
		this.connection.onmessage = (evt) => {
			// add the new message to state
			console.log('onmessage');
			console.log(evt);
		};

		// open the connection
		this.connection.onopen = () => {
			console.log('[websocket] create connection');
			this.connection.send('message');
		};

		this.connection.close = () => {
			console.log('[websocket] close');
		};

		this.connection.onerror = () => {
			console.log('[websocket] error');
		};
	}

	render() {
		return (
			<Grid container spacing={0}>
				<h1 style={{ paddingTop: '20px', margin: '0 auto' }}>ChatRoom</h1>
				<Grid container alignItems="center" justify="center" style={{ display: 'flex' }}>
					<Paper
						style={{
							marginTop: '20px',
							height: '500px',
							maxHeight: '500px',
							width: '500px',
							padding: '15px',
							overflowY: 'scroll'
						}}
					>
						<Typography component="div">
							<div
								className="left-content"
								style={{
									width: '50px',
									height: '50px',
									lineHeight: '50px',
									color: 'white',
									borderRadius: '99%',
									background: 'gray',
									textAlign: 'center',
									display: 'inline-block'
								}}
							>
								user
							</div>
							<div
								className="right-content"
								style={{
									width: '80%',
									paddingLeft: '15px',
									wordBreak: 'break-word',
									height: '80px',
									display: 'inline-block'
								}}
							>
								demodemo
							</div>
						</Typography>

						<Typography component="div">
							<div
								className="my-left-content"
								style={{
									width: '80%',
									paddingRight: '15px',
									wordBreak: 'break-word',
									height: '80px',
									display: 'inline-block',
									textAlign: 'right'
								}}
							>
								demo
							</div>
							<div
								className="my-right-content"
								style={{
									width: '50px',
									height: '50px',
									lineHeight: '50px',
									color: 'white',
									borderRadius: '99%',
									background: 'gray',
									textAlign: 'center',
									display: 'inline-block'
								}}
							>
								AAAA
							</div>
						</Typography>
					</Paper>
					<div
						style={{
							position: 'fixed',
							bottom: '0',
							width: '530px',
							background: 'gray',
							color: 'white',
							height: '50px',
							lineHeight: '50px'
						}}
					>
						<input
							type="text"
							style={{
								height: '100%',
								width: '100%'
							}}
							placeholder="Please input your message"
							onKeyPress={this._handleKeyPress}
						/>
					</div>
				</Grid>
			</Grid>
		);
	}

	_handleKeyPress(e) {
		if (e.key === 'Enter') {
			// push data to array
		}
	}
}

export default ChatRoom;
