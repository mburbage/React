import React, { Component } from 'react';
import propTypes from 'prop-types';
import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Auxiliary';
import AuthContext from '../../../components/context/auth-context';

class Person extends Component {

	constructor(props) {
		super(props);
		this.inputElRef = React.createRef();
	}

	static contextType = AuthContext;

	componentDidMount() {
		this.inputElRef.current.focus();
		console.log(this.context.authenticated);
	}
	render () {
		console.log('[Person.js] rendering...');
		return (
			<Aux>	
				
				{this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}
				
				<p onClick={this.props.click}>
					I'm {this.props.name} and I am {this.props.age} years old.
				</p>
				<p>{this.props.children}</p>
				<input 
					//ref={(el) => {this.inputEl = el}}
					ref={this.inputElRef}
					type="text" 
					onChange={this.props.changed} 
					value={this.props.name} 
				/>
						
			</Aux>
		);
	}
	
	
}

Person.propTypes = {
	click: propTypes.func,
	name: propTypes.string,
	age: propTypes.number,
	changed: propTypes.func
};

export default withClass(Person, classes.Person);

