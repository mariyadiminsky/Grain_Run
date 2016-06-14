import React from 'react';

class FinishedBox extends React.Component{
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div id="finished-game" className="well text-center">
				<h3>{this.props.finishedGame}</h3>
			<button className="btn btn-default" onClick={this.props.resetGame}> Play Again </button>
			</div>
		)
	}
};

export default FinishedBox;
