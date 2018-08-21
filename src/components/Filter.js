import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

class Filter extends Component {
	constructor(props) {
		super(props);

		this._setFilter = this._setFilter.bind(this);
	}

	render() {
		return (
			<Grid container item xs={12} alignItems="center" justify="center" style={{ display: 'flex' }}>
				<FormGroup row>
					<FormControlLabel
						value="all"
						control={
							<Radio
								color="primary"
								checked={this.props.filter === 'all'}
								onChange={() => this._setFilter('all')}
							/>
						}
						label="全部"
					/>
					<FormControlLabel
						value="complete"
						control={
							<Radio
								color="primary"
								checked={this.props.filter === 'complete'}
								onChange={() => this._setFilter('complete')}
							/>
						}
						label="已完成"
					/>
					<FormControlLabel
						value="uncomplete"
						control={
							<Radio
								color="primary"
								checked={this.props.filter === 'uncomplete'}
								onChange={() => this.props.setFilter('uncomplete')}
							/>
						}
						label="未完成"
					/>
				</FormGroup>
			</Grid>
		);
	}

	_setFilter(filter) {
		this.props.setFilter(filter);
	}
}

export default Filter;
