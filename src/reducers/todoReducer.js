import { ADD_TODO, TOGGLE_TODO, FETCH_TODO } from '../actions/types';

export const todoReducer = (state = {}, action) => {
	let array;
	switch (action.type) {
		case ADD_TODO:
			array = [
				...state.array,
				{
					uid: action.payload.uid,
					value: action.payload.value,
					complete: action.payload.complete
				}
			];

			return {
				array,
				request: action.payload.request
			};

			// return [
			// 	...state,
			// 	{
			// 		uid: action.payload.uid,
			// 		value: action.payload.value,
			// 		complete: action.payload.complete
			// 	}
			// ];
			break;
		case FETCH_TODO:
			array = action.payload.result;
			return {
				array
			};
			// return action.payload.result;
			break;
		case TOGGLE_TODO:
			array = [ ...state.array ];
			return {
				array,
				request: action.payload.result
			};
			break;
		default:
			return state;
	}
};

export default todoReducer;
