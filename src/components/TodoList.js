import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TodoItem from './TodoItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import Filter from './Filter';
import FilterContainer from '../container/FilterContainer';

class TodoList extends Component {
	constructor(props) {
		super(props);

		var _this = this;
		_this._handleKeyPress = _this._handleKeyPress.bind(_this);
		_this._handleToggler = _this._handleToggler.bind(_this);
	}

	componentDidMount() {
		this.props.fetchTodo();
	}

	componentDidUpdate() {
		this._showDialog();
	}

	render() {
		return (
			<Grid container spacing={16}>
				<Grid container item xs={12} alignItems="center" justify="center" style={{ display: 'flex' }}>
					<h1>TodoList</h1>
				</Grid>

				{/* <Filter /> */}
				<FilterContainer />

				<Grid container item xs={12} alignItems="center" justify="center" style={{ display: 'flex' }}>
					<Input
						placeholder="Please Input Todo Item"
						inputProps={{
							'aria-label': 'Description'
						}}
						onKeyPress={this._handleKeyPress}
					/>
				</Grid>
				<Grid container item xs={12} alignItems="center" justify="center" style={{ display: 'flex' }}>
					<TodoItem items={this.props.tmpItems.array} _handleToggler={this._handleToggler} />
				</Grid>
			</Grid>
		);
	}

	_handleKeyPress(e) {
		var _this = this;
		if (e.key === 'Enter') {
			let value = e.target.value;
			let uid = new Date().getTime();

			this.props.createTodo({
				uid: uid.toString(),
				value: value,
				complete: false
			});
		}
	}

	_handleToggler(e, index) {
		var tmp = this.props.items.array.slice(0);
		tmp[index].complete = e.target.checked;
		this.props.toggleTodo(tmp[index]);
	}

	_showDialog() {
		switch (this.props.requestCode) {
			case 1:
				Swal({
					text: 'Request Success',
					type: 'success'
				});
				break;
			case -1:
				Swal({
					text: 'Pass Parameter Not Matched',
					type: 'warning'
				});
				break;
			case -2:
				Swal({
					text: 'Request Failed',
					type: 'warning'
				});
				break;
			case -3:
				Swal({
					text: 'System Busy',
					type: 'warning'
				});
				break;
		}
	}
}

export default TodoList;
