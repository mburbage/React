import React from 'react';

const validation = (props) => {

	const textlength = props.textlength;
	
	const lengthCondition = textlength <= 5 ? 'Text is to short.' : 'Text is long enough.';

	return (
		<div>
			<p>{textlength}</p>
			<p>{lengthCondition}</p>
		</div>
	)
}

export default validation;