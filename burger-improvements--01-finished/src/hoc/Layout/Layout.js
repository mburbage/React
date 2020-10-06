import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
	
	const [sideDrawerIsVisisble, setsideDrawerIsVisisble] = useState(false);

	const sideDrawerClosedHandler = () => {
		setsideDrawerIsVisisble(false);
	};

	const sideDrawerToggleHandler = () => {
		setsideDrawerIsVisisble(!sideDrawerIsVisisble);
	};

	return (
		<Aux>
			<Toolbar
				isAuth={props.isAuthenticated}
				drawerToggleClicked={sideDrawerToggleHandler} />
			<SideDrawer
				isAuth={props.isAuthenticated}
				open={sideDrawerIsVisisble}
				closed={sideDrawerClosedHandler} />
			<main className={classes.Content}>
				{props.children}
			</main>
		</Aux>
	);

};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

export default connect(mapStateToProps)(layout);