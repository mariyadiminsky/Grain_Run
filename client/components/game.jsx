import React from 'react';
import ReactDOM from 'react-dom';
import possibleCombinationSum from './possibleCombinationSum.jsx';
import FinishedBox from './finishedBox.jsx';
import NumbersBox from './numbersBox.jsx';
import GrainsBox from './grainsBox.jsx';
import Button from './button.jsx';
import AnswerBox from './answerBox.jsx';
import Rules from './rules.jsx';
	
class Game extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			numGrains: this.randomNum(),
			isCorrect: null,
			refreshAmount: 5,
			selectedNumbers: [],
			acceptedNumbers: [],
			finishedGame: null,
			response: "TEST"
		}
		
		// ES6 React doesn't support auto-binding
		this.clickedNum = this.clickedNum.bind(this);
		this.unClickedNum = this.unClickedNum.bind(this);
		this.chkAnswer = this.chkAnswer.bind(this);
		this.acceptAnswer = this.acceptAnswer.bind(this);
		this.refreshGrains = this.refreshGrains.bind(this);
		this.updateFinishedGameResult = this.updateFinishedGameResult.bind(this);
		this.resetGame = this.resetGame.bind(this);
	}
	
	// since replaceSet was depreciated in ES6, I created a copy of the initial states of all properties to be used when player called resetGame() on game success/over.
	initialState() {
		this.state = {
			numGrains: this.randomNum(),
			isCorrect: null,
			refreshAmount: 5,
			selectedNumbers: [],
			acceptedNumbers: [],
			finishedGame: null,
			response: "TEST"
		}
	}
	
	// used for generating random number of grains.
	randomNum() {
		return Math.floor(Math.random() * 9) + 1;
	}
	
	// reset isCorrect state every time they select a number here and in unClickedNum so game can continue. 
	clickedNum(clickedNumber) {
		this.setState({
			selectedNumbers:this.state.selectedNumbers.concat(clickedNumber),
			isCorrect: null,
		})
	}

	unClickedNum(clickedNumber) {
		let selectedNums = this.state.selectedNumbers;
		let indexOfClickedNum = selectedNums.indexOf(clickedNumber);
		
		selectedNums.splice(indexOfClickedNum, 1);

		// update selectedNums with newly spliced array.
		this.setState({
			selectedNumbers: selectedNums,
			isCorrect: null
		});
	}
	
	// add numbers in AnswerBox, via currently selected numbers, and check if total is the same as in grainsBox in chkAnswer()
	sumSelectedNums() {
		return this.state.selectedNumbers.reduce((num1, num2) => {
			return num1 + num2;
		}, 0)	
	}

	chkAnswer() {
		let chk = this.sumSelectedNums() === this.state.numGrains;
		this.setState({isCorrect: chk});
	}

	/* 
		+ function to disable numbers in sessions that were successful and restart game, until all numbers are used up. Will be called when isCorrect is true in Button component.
		+ concat and update currently correctly selected nums and empty the selectedNumbers array since these numbers were correctly used they no longer can be played with. Also reset correct state, similarly like I did in clickedNum to reflect numbers that were used. Most importantly, render a new random number of grains to continue game.
		+ setState is asynchronous by nature, but gives a second parameter to use when the first parameters is done, similar to a then promise.
	*/
	acceptAnswer() {
		let newResponse = "You dit it!";
		let newAcceptedNums = this.state.acceptedNumbers.concat(this.state.selectedNumbers);
		this.setState({
			acceptedNumbers: newAcceptedNums,
			selectedNumbers: [],
			isCorrect: null,
			numGrains: this.randomNum(),
			response: newResponse
		}, function() {
			this.updateFinishedGameResult();
		})
	}
	
	refreshGrains() {
		if(this.state.refreshAmount !== 0) {
			this.setState({
				numGrains: this.randomNum(),
				isCorrect: null,
				refreshAmount: this.state.refreshAmount-1,
				selectedNumbers:[]
			}, function() {
			this.updateFinishedGameResult();
			})
		}
	}
	
	possibleSolutions() {
		let numGrains = this.state.numGrains;
		let acceptedNums = this.state.acceptedNumbers;
		let possibleNums = [];
		
		for(var i=1; i<=9; i++) {
			if(acceptedNums.indexOf(i) < 0) {
				possibleNums.push(i);
			}
		}
		
		return possibleCombinationSum(possibleNums, numGrains);
	}
	
	updateFinishedGameResult() {
		if(this.state.acceptedNumbers.length === 9) {
			this.setState({finishedGame: "Nice job! Sasha is grateful for your good work!"});
			return;
		}
		
		if(this.state.refreshAmount === 0 && !this.possibleSolutions()) {
			this.setState({finishedGame: "Game Over!"});
			return;
		}
	}
	
	resetGame() {
		this.forceUpdate(this.initialState());
	}
	
	render() {
		let gameStatus;
		
		if(this.state.finishedGame) {
			gameStatus = (
				<FinishedBox finishedGame = {this.state.finishedGame} resetGame={this.resetGame}/>
			)
		}else {
			gameStatus = (
				<NumbersBox selectedNums={this.state.selectedNumbers} clickedNum={this.clickedNum} acceptedNums={this.state.acceptedNumbers} resetGame={this.resetGame}/>
			)							
		}
		return (
			<div id="game" className="text-center">
				<h2> CHANGED H2 TAG NOT RENDERING! </h2>
				<hr />
				<div className="clearfix">
					<GrainsBox numGrains={this.state.numGrains}/>
					<Button selectedNums={this.state.selectedNumbers} isCorrect = {this.state.isCorrect} chkAnswer={this.chkAnswer} acceptAnswer={this.acceptAnswer} refreshGrains={this.refreshGrains} refreshAmount={this.state.refreshAmount}/>
					<AnswerBox selectedNums={this.state.selectedNumbers} unClickedNum={this.unClickedNum} response={this.state.response}/>
				</div>						
			{gameStatus}
			<Rules />
			</div>
		)
	}
}

ReactDOM.render(<Game/>, document.getElementById('container'));