import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	orders: [],
	loading: false,
	purchased: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASED_BURGER_START:
			return updateObject(state, {loading: true});
		case actionTypes.PURCHASED_BURGER_SUCCESS:
			const newOrder = updateObject(action.orderData, {userId: action.orderID} );
			return updateObject(state, {
				...state,
				loading: false,
				purchased: true,
				orders: state.orders.concat(newOrder)
			});
		case actionTypes.PURCHASED_BURGER_FAILED:
			return updateObject(state, {loading: false});
		case actionTypes.PURCHASED_INIT:
			return updateObject(state, {purchased: false});
		case actionTypes.FETCH_ORDERS_START:
			return updateObject(state, {loading: true});
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return updateObject(state, {orders: action.orders, loading: false});
		case actionTypes.FETCH_ORDERS_FAILED:
			return updateObject(state, {loading: false});
		default:
			return state;
	}
};

export default reducer;