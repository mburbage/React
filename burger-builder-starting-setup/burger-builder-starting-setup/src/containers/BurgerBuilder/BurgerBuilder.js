import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderAction from '../../store/actions/index';



class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	};

	componentDidMount () {
		this.props.onInitIngredients();
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		if(this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath('/check-out')
			this.props.history.push('/auth');
		}
		
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/check-out');
	};

	render () {

		const disabledInfo = {
			...this.props.ing
		};



		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

		if (this.props.ing) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ing} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchaseable={this.updatePurchaseState(this.props.ing)}
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
						price={this.props.price} />
				</Aux>
			);
			orderSummary = <OrderSummary
				ingredients={this.props.ing}
				purchaseCanceled={this.purchaseCancelHandler}
				price={this.props.price}
				purchaseContinue={this.purchaseContinueHandler} />;
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ing: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.idToken !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(burgerBuilderAction.initIngredients()),
		onInitPurchase: () => dispatch(burgerBuilderAction.purchasedInit()),
		onSetAuthRedirectPath: (path) => dispatch(burgerBuilderAction.setAuthRedirectPath(path))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));