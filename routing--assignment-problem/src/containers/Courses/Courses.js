import React, { Component } from 'react';
import Course from '../Course/Course';

import './Courses.css';
import { Route } from 'react-router-dom';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
	}
	
	openCourseHandler = (id) => {
		this.props.history.push({pathname: '/courses/' + id, state: this.state });
	}

    render () {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return <article className="Course" key={course.id} onClick={() => this.openCourseHandler(course.id)}>{course.title}</article>;
                        } )
                    }
                </section>
				<Route path={this.props.match.url + '/:id'} component={Course} />
            </div>
        );
    }
}

export default Courses;