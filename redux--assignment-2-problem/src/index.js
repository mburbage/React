import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
	persons: []
}

// Reducer
const rootReducer = (state = initialState, action) => {
	if (action.type === 'ADD_PERSON') {
		return { 
			...state,
			persons: state.persons.concat({
				id: Math.random(), // not really unique but good enough here!
				name: action.personData.name,
				age: action.personData.age
			})
		}
		
	}
	return state;
}

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
