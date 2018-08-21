import { ADD_TODO, TOGGLE_TODO, FETCH_TODO, SET_FILTER } from './types';
import axios from 'axios';

const apiUrlPrefix = 'http://localhost:3003';

export const createTodo = ({ uid, value, complete }) => {
	return (dispatch) => {
		return axios
			.post(`${apiUrlPrefix}/add/todolist`, {
				uid: uid,
				value: value,
				complete: 0
			})
			.then((response) => {
				let newTodoObj = { uid, value, complete };
				dispatch(createTodoSuccess(response, newTodoObj));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const createTodoSuccess = (response, newTodoObj) => {
	return {
		type: ADD_TODO,
		payload: {
			...newTodoObj,
			request: response.data.result
		}
	};
};

export const fetchTodoList = () => {
	return (dispatch) => {
		axios
			.get(`${apiUrlPrefix}/todolist`)
			.then((response) => {
				dispatch(fetchTodoListSuccess(response));
			})
			.catch((err) => {
				console.log('[actions][fetchTodoList]', `fetch todo list error: ${err}`);
			});
	};
};

export const fetchTodoListSuccess = (response) => {
	return {
		type: FETCH_TODO,
		payload: {
			result: response.data.result
		}
	};
};

export const setTodoListFilter = (filter) => {
	return {
		type: SET_FILTER,
		payload: {
			result: filter
		}
	};
};

export const toggleTodo = (todo) => {
	return (dispatch) => {
		axios
			.post(`${apiUrlPrefix}/update/todolist/${todo.uid}`, {
				complete: todo.complete
			})
			.then((response) => {
				dispatch(toggleTodoSuccess(response));
			})
			.catch((error) => {
				console.log('[toggleTodo][error]', error);
				dispatch(
					toggleTodoSuccess({
						data: {
							result: -3
						}
					})
				);
			});
	};
};

export const toggleTodoSuccess = (response) => {
	return {
		type: TOGGLE_TODO,
		payload: {
			result: parseInt(response.data.result)
		}
	};
};
