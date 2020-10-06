import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';


const layout = props => {

	const [sideDrawerIsVisible, setsideDrawerIsVisible] = useState(false);

	const sideDrawerClosedHandler = () => {
		setsideDrawerIsVisible(false);
	};

	const sideDrawerOpenHandler = () => {
		setsideDrawerIsVisible(!sideDrawerIsVisible);
	};

	return (
		<Aux>
			<Toolbar
				open={sideDrawerOpenHandler}
				isAuth={props.isAuthenticated} />
			<SideDrawer
				open={sideDrawerIsVisible}
				closed={sideDrawerClosedHandler}
				isAuth={props.isAuthenticated} />
			<main className={classes.Content}>
				{props.children}
			</main>
		</Aux>
	);

};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.idToken !== null
	};
};

export default connect(mapStateToProps)(layout);