import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../components/context/auth-context';

class App extends Component {

	constructor (props) {
		super(props);
		console.log('[Apps.js] constructor');
	}

	state = {
		persons: [
			{ id: '345', name: 'Max', age: 28 }, 
			{ id: '765', name: 'Manu', age: 36 },
			{ id: '983', name: 'Stephanie', age: 26 }
		],
		showPersons: false,
		showCockpit: true,
		changeCounter: 0,
		authenticated: false
	};

	static getDerivedStateFromProps(props, state) {
		console.log('[App.js] getDerivedStateFromProps', props);
		return state;
	}

	componentDidMount() {
		console.log('[App.js] componentDidMount');
	}

	shouldComponentUpdate() {
		console.log('[App.js] shouldComponentUpdate');
		return true;
	}

	componentDidUpdate() {
		console.log('[App.js] componentDidUpdate');
	}

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex( p => {
			return p.id === id;
		})

		const person = {
			...this.state.persons[personIndex]
		}

		person.name = event.target.value;

		const persons = [...this.state.persons];
		persons[personIndex] = person;

		this.setState( () => {
			return {
				persons: persons, 
				changeCounter: this.state.changeCounter + 1
			}			
		} );
	}

	deletePersonHandler = (personIndex) => {
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({persons: persons});
	}

	togglePersonsHandler = (event) => {
		const doesShow = this.state.showPersons;
		this.setState({showPersons: !doesShow});
	}

	loginHandler = () => {
		this.setState({authenticated: true});
	};
	// console.log(personState);
	
	render(){
		console.log('[App.js] render');

		let persons = null;

		if (this.state.showPersons) {
			persons = <Persons 
			persons={this.state.persons}
			clicked={this.deletePersonHandler}
			changed={this.nameChangedHandler}
			thisAuthenticated={this.state.authenticated} />
			;

		}

		return (
			<Aux classes={classes.App}>
				<button 
					onClick={() => {
						this.setState({showCockpit: false})
					}}
					>
						Remove Cockpit
				</button>
				<AuthContext.Provider value={{
					authenticated: this.state.authenticated, 
					login: this.loginHandler
					}}>
					{ this.state.showCockpit ? (
					<Cockpit 
						title={this.props.appTitle}
						showPersons={this.state.showPersons}
						personsLength={this.state.persons.length}
						clicked={this.togglePersonsHandler}
						/>
						) : null }
					{persons}
				</AuthContext.Provider>
			</Aux>
		);
	}
	
	//return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'))


}

export default withClass(App, classes.App);

