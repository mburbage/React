import React from 'react';

const inlinebox = (props) => {
	
		return (
			<span style={props.style} onClick={props.click}>
				<span >{props.text}</span>
			</span>
		)
	
}

export default inlinebox;