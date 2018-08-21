import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import PropTypes from 'prop-types';
import '../css/TodoItem.css';
import _ from 'lodash';

class TodoItem extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		let isArray = _.isArray(this.props.items);

		return (
			<List style={{ width: '200px' }}>
				{isArray ? (
					this.props.items.map((item, index) => (
						<ListItem key={item.uid} style={{ backgroundColor: '#e0dfdfee', marginBottom: '10px' }}>
							<ListItemText className={{ 'line-through': item.complete }} primary={`${item.value}`} />
							<ListItemSecondaryAction>
								<Checkbox
									onChange={(e) => this.props._handleToggler(e, index)}
									checked={item.complete}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					))
				) : (
					<ListItem>
						<ListItemText>無資料</ListItemText>
					</ListItem>
				)}
			</List>
		);
	}
}

// TodoItem.propTypes = {
// 	items: PropTypes.arrayOf(PropTypes.string)
// };

export default TodoItem;
