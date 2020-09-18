import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';


class Layout extends Component {

	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerOpenHandler = () => {
		this.setState({ showSideDrawer: true });
	};

	render () {
		return (
			<Aux>
				<Toolbar
					open={this.sideDrawerOpenHandler}
					isAuth={this.props.isAuthenticated} />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
					isAuth={this.props.isAuthenticated} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.idToken !== null
	};
};

export default connect(mapStateToProps)(Layout);