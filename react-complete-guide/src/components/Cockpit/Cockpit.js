import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../components/context/auth-context';

const cockpit = (props) => {

	const toggleButtonRef = useRef(null);
	const authContext = useContext(AuthContext);

	console.log(authContext.authenticated)

	useEffect(() => {
		console.log('[Cockpit.js] useEffect');
		// const timer = setTimeout(() => {
		// setTimeout(() => {
		// 	alert('Saved data to cloud.')
		// }, 1000);
		toggleButtonRef.current.click();
		return () => {
			//clearTimeout(timer);
			console.log('[Cockpit.js] clean up work in useEffect');
		}
	}, []);

	useEffect(() => {
		console.log('[Cockpit.js] 2nd useEffect');
		return () => {
			console.log('[Cockpit.js] clean up work in 2nd useEffect');
		}
	})

	const assignedClasses = [];

	let btnClass = [];
	if (props.showPersons) {
		btnClass.push(classes.Red);
	}
			

	if (props.personsLength <= 2) {
		assignedClasses.push(classes.red);
	}
	if (props.personsLength <= 1) {
		assignedClasses.push(classes.bold);
	}

	return (
		<div className={classes.Cockpit}>
			<h1>{props.title}</h1>
			<p className={assignedClasses.join(' ')}>This is really woriking.</p>
			<button 
				ref={toggleButtonRef}
				className={btnClass} 
				onClick={props.clicked}
			>
			Toggle Person
			</button>	
			
			<button onClick={authContext.login}>Log in</button>
			
		</div>
	)
}

export default React.memo(cockpit);