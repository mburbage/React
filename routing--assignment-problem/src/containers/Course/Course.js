import React, { Component } from 'react';

class Course extends Component {

	

	render () {

		const crs = this.props.location.state.courses.findIndex(crs => crs.id === +this.props.match.params.id);
		
		const courseTitle = this.props.location.state.courses[crs].title;
		
		return (
            <div>
                {courseTitle}
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;