import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			zip: '',
			state: '',
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Michael',
				address: {
					street: '',
					state: '',
					zipCode: 0,
					country: ''
				},
				email: 'mmmm@test.com'
			},
			deliveryMethod: 'Take Out',
			instructions: ''
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({loading: false});
			});
	}

	render () {
		let form = ( <form>
				<input type="text" name="name" placeholder="Your name" />
				<input type="email" name="email" placeholder="Your Email" />
				<input type="text" name="street" placeholder="Address" />
				<input type="text" name="zip" placeholder="Zip Code" />
				<input type="text" name="state" placeholder="State" />
				<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
			</form>

		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact info</h4>
				{form}
			</div>
		)
	}
};

export default ContactData;