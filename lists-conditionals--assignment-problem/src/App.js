import React, { Component } from 'react';
import Validation from './Validation/Validation';
import InlineBox from './InlineBox/InlineBox';
import './App.css';

class App extends Component {
  
	state = {
		text: '',
		length: 0
	}

	// Calculate length of entered text
	textHandler = (event) => {
		const textLength = event.target.value.length;

		// Update and setState
		this.setState( {text: event.target.value, length: textLength} );
				
		// Validate text length with validation component
		
	}

	deleteInlineBox = (index) => {
		const text = [...this.state.text];		
		text.splice(index, 1);
		this.setState({text: text.join('')});
	}
	
	render() {

		const style = {
			display: 'inline-block', 
			padding: '16px', 
			textalign: 'center', 
			margin: '16px', 
			border: '1px solid black'
		}

		let boxes = null
		
		const splitText = this.state.text.split('');

		boxes = (
			<div>
				{splitText.map( (el, index) => {
					console.log(index);
					return <InlineBox 
						click={() => this.deleteInlineBox(index)}
						style={style} 
						text={el}
						key={index} />
				})}
			</div>
		)
		

		return (
		<div className="App">
			<input type="text" onChange={this.textHandler}/>
			<Validation textlength={this.state.length} />
			{boxes}
			<ol>
			<li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
			<li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
			<li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
			<li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
			<li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
			<li>When you click a CharComponent, it should be removed from the entered text.</li>
			</ol>
			<p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
		</div>
		);
  }
}

export default App;
