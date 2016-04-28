// possible ideas for further development: levels, css, pixelart, story, timers, points based on time and/or how many refresh's used. Harder every level, decrease redraws per level. Store players and points in online database.

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

var StarsBox = React.createClass({
	render: function() {
		var stars = [];
		// new random numStars number is triggered everytime there is a re-render, which happens when, for example, I click a number and it's state changes to diable. This means the browser DOM needs to re-render and thus this function runs again. To fix this issue, I passed numStars into the parent's(Game)'s initial state, so when the selectedNumber's property is changed, numStars doesn't change with it everytime.
		for(var i=1; i<=this.props.numStars; i++) {
			stars.push(
				<span className='glyphicon glyphicon-grain'></span>
			);
		}
		return (
			<div id="stars-box">
				<div className="well">
					{stars}
				</div>
			</div>
		)
	}
});

var Button = React.createClass({
	render: function() {
		var disabled = this.props.selectedNums.length === 0;
		var correct = this.props.isCorrect;
		var theBtn;
		
		switch(correct) {
			case true:
				theBtn = (
					<div className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
						<span className='glyphicon glyphicon-ok'></span>
					</div>
				)
				break;
			case false:
				theBtn = (
					<div className="btn btn-danger btn-lg">
						<span className='glyphicon glyphicon-remove'></span>
					</div>
				)
				break;
			default:
				theBtn = (
					<div className="btn btn-primary btn-lg" onClick={this.props.chkAnswer} disabled = {disabled}>
						=
					</div>
				)
		}
		
		// this: &nbsp; means an unbreaking space
		return (
			<div id="button-game">
				{theBtn}
			<br /><br />
			<button className="btn btn-warning btn-xs" onClick={this.props.refreshStars} disabled={this.props.refreshAmount === 0}>
				<span className="glyphicon glyphicon-refresh"></span>   
			&nbsp;
			{this.props.refreshAmount}
			</button>
			</div>
		)
	}
});

var AnswerBox = React.createClass({
	render: function() {
		// apparently in react you don't have to loop over arrays, you can just pass them in and each element will automatically be rendered within it's own span element. Why simply placing this.props.selectedNums did render the numbers, they were not in a span so I was unable to style them. Thus I left them like this.
		var props = this.props; // important because can't be accessed inside variable
		var selectedNums = this.props.selectedNums.map(function(num) {
			return(
				<div className="number" onClick={props.unClickedNum.bind(null, num)}>{num}</div>
			)
		});
		return(
			<div id="answer-box">
				<div className="well">
					{selectedNums}
				</div>
			</div>
		)
	}
});

var NumbersBox = React.createClass({
	render: function() {
		var numbers = [];
		for(var i=1; i<=9; i++) {
			
			// disable numbers that went through a session and correctly matched the number of stars, they should be in acceptedNumbers array.
			if(this.props.acceptedNums.indexOf(i) >= 0){
				numbers.push(
					<div className="numberdisabled-accepted">{i}</div>
				);
			// disable numbers that were already selected
			}else if(this.props.selectedNums.indexOf(i) >= 0) {
				numbers.push(
					<div className="numberdisabled-normal">{i}</div>
				);
			}else {
				// parametes can't be passed into functions directly so bind creates a copy of the function that would remember the value bound to it. Cant do this.props.clickedNum(i), have to do it this way instead to pass the value as the parameter.
				numbers.push(
					<div className="number" onClick={this.props.clickedNum.bind(null, i)}>{i}</div>
				);
			}
		}

		return(
			<div id="numbers-box">
				<div className="well">
					{numbers}
				</div>
			</div>
		)
	}
})

var FinishedBox = React.createClass({
	render: function() {
		return (
			<div id="finished-game" className="well text-center">
				<h3>{this.props.finishedGame}</h3>
			<button className="btn btn-default" onClick={this.props.resetGame}> Play Again </button>
			</div>
		)
	}
})

var Game = React.createClass({
	getInitialState: function() {
		return {
			numStars: this.randomNum(),
			isCorrect: null,
			refreshAmount: 5,
			selectedNumbers: [],
			acceptedNumbers: [],
			finishedGame: null
		}
	},	
	randomNum: function() {
		return Math.floor(Math.random() * 9) + 1;
	},
	clickedNum: function(clickedNumber) {
		// reset isCorrect state every time they select a number here and in unClickedNum. 
		this.setState({
			selectedNumbers:this.state.selectedNumbers.concat(clickedNumber),
			isCorrect: null
		})
	},
	unClickedNum: function(clickedNumber) {
		var selectedNums = this.state.selectedNumbers;
		var indexOfClickedNum = selectedNums.indexOf(clickedNumber);
		
		selectedNums.splice(indexOfClickedNum, 1);

		// update selectedNums with newly spliced array
		this.setState({
			selectedNumbers: selectedNums,
			isCorrect: null
		});
	},
	sumSelectedNums: function() {
		return this.state.selectedNumbers.reduce(function(num1, num2) {
			return num1 + num2;
		}, 0)	
	},
	chkAnswer: function() {
		var chk = this.sumSelectedNums() === this.state.numStars;
		this.setState({isCorrect: chk});
	}, 
	// function to disable numbers in sessions that were successful and restart game, until all numbers are used up. Will be called when isCorrect is true in button component.
	// setState is asynchronous by nature, but gives a second parameter to use when the first parameters is done, similar to a then promise.
	acceptAnswer: function() {
		// concat and update currently correctly selected nums and empty the selectedNumbers array since these numbers were correctly used they no longer can be played with. Also reset correct state, similarly like I did in clickedNum to reflect numbers that were used. Most importantly, render a new random number of starts to continue game.
		var newAcceptedNums = this.state.acceptedNumbers.concat(this.state.selectedNumbers);
		this.setState({
			acceptedNumbers: newAcceptedNums,
			selectedNumbers: [],
			isCorrect: null,
			numStars: this.randomNum(),
		}, function() {
			this.updateFinishedGameResult();
		})
	},
	refreshStars: function() {
		if(this.state.refreshAmount !== 0) {
			this.setState({
				numStars: this.randomNum(),
				isCorrect: null,
				refreshAmount: this.state.refreshAmount-1,
				selectedNumbers:[]
			}, function() {
			this.updateFinishedGameResult();
			})
		}
	},
	possibleSolutions: function() {
		var numStars = this.state.numStars;
		var acceptedNums = this.state.acceptedNumbers;
		var possibleNums = [];
		
		for(var i=1; i<=9; i++) {
			if(acceptedNums.indexOf(i) < 0) {
				possibleNums.push(i);
			}
		}
		
		return possibleCombinationSum(possibleNums, numStars);
	},
	updateFinishedGameResult: function() {
		if(this.state.acceptedNumbers.length === 9) {
			this.setState({finishedGame: "Done. Nice job!"});
			return;
		}
		
		if(this.state.refreshAmount === 0 && !this.possibleSolutions()) {
			this.setState({finishedGame: "Game Over!"});
			return;
		}
	}, // With setState the current and previous states are merged. With replaceState, it throws out the current state, and replaces it with only what you provide. 
	resetGame: function() {
		this.replaceState(this.getInitialState());
	},
	render: function() {
		var gameStatus;
		
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
			<div id="game">
				<h2> Play the Game! </h2>
				<hr />
				<div className="clearfix">
					<StarsBox numStars={this.state.numStars}/>
					<Button selectedNums={this.state.selectedNumbers} isCorrect = {this.state.isCorrect} chkAnswer={this.chkAnswer} acceptAnswer={this.acceptAnswer} refreshStars={this.refreshStars} refreshAmount={this.state.refreshAmount}/>
					<AnswerBox selectedNums={this.state.selectedNumbers} unClickedNum={this.unClickedNum}/>
				</div>
										
			{gameStatus}
			
			</div>
		)
	}
})

ReactDOM.render(<Game/>, document.getElementById('container'));