import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TodoItem from './TodoItem';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import axios from 'axios';
import Swal from 'sweetalert2';

class TodoList extends Component {
	constructor(props) {
		super(props);

		var _this = this;

		_this.state = {
			items: [],
			selectedValue: '',
			tmpItems: []
		};
		_this._handleKeyPress = _this._handleKeyPress.bind(_this);
		_this._handleToggler = _this._handleToggler.bind(_this);
		_this._handleChange = _this._handleChange.bind(_this);

		axios
			.get('http://localhost:3003/todolist')
			.then((response) => {
				let result = response.data.result;
				_this.setState({
					items: result,
					tmpItems: result
				});
			})
			.catch((err) => {
				Swal({
					title: 'System busy',
					type: 'warning'
				});
				console.log(`err => ${err}`);
			});
	}

	render() {
		return (
			<Grid container spacing={16}>
				<Grid container item xs={12} alignItems="center" justify="center" style={{ display: 'flex' }}>
					<h1>TodoList</h1>
				</Grid>

				<Grid container item xs={12} alignItems="center" justify="center" style={{ display: 'flex' }}>
					<FormGroup row>
						<FormControlLabel
							value="all"
							control={
								<Radio
									color="primary"
									onChange={this._handleChange}
									checked={this.state.selectedValue === 'all'}
								/>
							}
							label="全部"
						/>
						<FormControlLabel
							value="complete"
							control={
								<Radio
									color="primary"
									onChange={this._handleChange}
									checked={this.state.selectedValue === 'complete'}
								/>
							}
							label="已完成"
						/>
						<FormControlLabel
							value="uncomplete"
							control={
								<Radio
									color="primary"
									onChange={this._handleChange}
									checked={this.state.selectedValue === 'uncomplete'}
								/>
							}
							label="未完成"
						/>
					</FormGroup>
				</Grid>

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
					<TodoItem items={this.state.tmpItems} _handleToggler={this._handleToggler} />
				</Grid>
			</Grid>
		);
	}

	_handleKeyPress(e) {
		var _this = this;
		if (e.key === 'Enter') {
			let value = e.target.value;
			let uid = new Date().getTime();

			var items = this.state.items;

			axios
				.post('http://localhost:3003/add/todolist', {
					uid: uid,
					value: value,
					complete: false
				})
				.then((response) => {
					var result = parseInt(response.data.result);

					switch (result) {
						case 1:
							items.push({
								uid: uid,
								value: value,
								complete: false
							});

							_this.setState({
								items: items,
								tmpItems: items
							});

							Swal({
								text: 'Add Success',
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
								text: 'Add Failed',
								type: 'warning'
							});
							break;
					}
				})
				.catch((err) => {
					Swal({
						text: 'Add Failed',
						type: 'warning'
					});
				});
		}
	}

	_handleToggler(e, index) {
		var tmp = this.state.items.slice(0);
		tmp[index].complete = e.target.checked;
		axios
			.post(`http://localhost:3003/update/todolist/${tmp[index].uid}`, {
				complete: e.target.checked
			})
			.then((response) => {
				var result = parseInt(response.data.result);
				switch (result) {
					case 1:
						var _this = this;
						_this.setState({
							items: tmp
						});
						Swal({
							text: 'Update Success',
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
							text: 'Add Failed',
							type: 'warning'
						});
						break;
				}
			})
			.catch((err) => {
				console.log(err);
				Swal({
					text: 'Add Failed',
					type: 'warning'
				});
			});
	}

	_handleChange = (event) => {
		var targetValue = event.target.value;

		this.setState({
			selectedValue: targetValue
		});

		var items = this.state.items.filter((item) => {
			if (targetValue === 'all') {
				return item;
			} else if (targetValue === 'complete') {
				return item.complete;
			} else {
				return !item.complete;
			}
		});

		this.setState({
			tmpItems: items
		});
	};
}

export default TodoList;
