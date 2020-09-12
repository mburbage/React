import React from 'react';
import { IoIosMenu } from 'react-icons/io';

const hamburgerMenu = (props) => (
	<div onClick={props.open}>
		<IoIosMenu size="2em" color="white" />
	</div>	
);

export default hamburgerMenu;