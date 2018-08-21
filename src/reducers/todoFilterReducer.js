import { SET_FILTER } from '../actions/types';

export const todoFilterReducer = (state = 'all', action) => {
	switch (action.type) {
		case SET_FILTER:
			return action.payload.result;
			break;
		default:
			return state;
	}
};

export default todoFilterReducer;
