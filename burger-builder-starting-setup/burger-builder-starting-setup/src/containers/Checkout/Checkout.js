import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinueHandler = () => {
		this.props.history.replace('/check-out/contact-data');
	};

	render () {
		let summary = <Redirect to="/" />;
		
		if (this.props.ing) {
			const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ing}
						onCheckoutCancelled={this.checkoutCancelledHandler}
						onCheckoutContinue={this.checkoutContinueHandler} />
					<Route
						path={this.props.match.path + '/contact-data'}
						component={ContactData} />
				</div>
			);
		}
		return summary;
	}
};

const mapStateToProps = state => {
	return {
		ing: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
};


export default connect(mapStateToProps)(Checkout);