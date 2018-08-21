import { connect } from 'react-redux';
import { setTodoListFilter } from '../actions';
import Filter from '../components/Filter';

const mapStateToProps = (state) => {
	return {
		filter: state.filterOption
	};
};

const mapDispatchToProp = (dispatch) => {
	return {
		setFilter: (filter) => {
			dispatch(setTodoListFilter(filter));
		}
	};
};

const FilterContainer = connect(mapStateToProps, mapDispatchToProp)(Filter);

export default FilterContainer;
