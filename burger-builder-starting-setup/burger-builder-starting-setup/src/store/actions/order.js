import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { fetchIngredientsFailed } from './burgerBuilder';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASED_BURGER_SUCCESS,
		orderData: orderData,
		orderId: id
	};
};

export const purchaseBurgerFailed = (error) => {
	return {
		type: actionTypes.PURCHASED_BURGER_FAILED,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASED_BURGER_START
	};
};

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post('/orders.json?auth=' + token, orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFailed(error));
			});
	};
};

export const purchasedInit = () => {
	return {
		type: actionTypes.PURCHASED_INIT
	};
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrdersFailed = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		error: error
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios.get('/orders.json' + queryParams)
			.then(res => {
				const fetchOrders = [];
				for (let key in res.data) {
					fetchOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrdersSuccess(fetchOrders));
			}).catch(err => {
				dispatch(fetchIngredientsFailed(err));
			});
	};
};