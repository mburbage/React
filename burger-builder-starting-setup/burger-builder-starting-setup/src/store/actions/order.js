import * as actionTypes from './actionTypes';

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
	return {
		type:actionTypes.PURCHASED_BURGER,
		token: token,
		orderData: orderData
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
	return {
		type: actionTypes.FETCH_ORDERS,
		token: token,
		userId: userId		
	};
};