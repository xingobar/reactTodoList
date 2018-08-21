import { connect } from 'react-redux';
import { createTodo, fetchTodoList, toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const filterTodoList = ({ items, filterOption }) => {
	switch (filterOption) {
		case 'all':
			return items;
			break;
		case 'complete':
			return {
				array: items.array.filter((item) => {
					return item.complete == 1;
				})
			};
			break;
		case 'uncomplete':
			return {
				array: items.array.filter((item) => {
					return item.complete !== 1;
				})
			};
			break;
	}
};

// map state
const mapStateToProps = (state) => {
	let filterItems = filterTodoList(state);

	return {
		items: state.items,
		tmpItems: filterItems,
		requestCode: state.items.request
	};
};

// map action
const mapDispatchToProps = (dispatch) => {
	return {
		// 指定有哪些methods可用
		createTodo: (todoObj) => {
			//呼叫action
			dispatch(createTodo(todoObj));
		},
		fetchTodo: () => {
			dispatch(fetchTodoList());
		},
		toggleTodo: (todo) => {
			dispatch(toggleTodo(todo));
		}
	};
};

const TodoContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);
export default TodoContainer;
