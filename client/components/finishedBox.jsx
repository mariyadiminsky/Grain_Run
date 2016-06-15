import React from 'react';

class FinishedBox extends React.Component{
	constructor(props) {
		super(props)
	}
	
	render() {
		let aGif;
	
		if(this.props.finishedGame === "Game Over!") {
			aGif = <p><img src="http://bestanimations.com/Military/Explosions/funny-explosion-animated-gif-7.gif"/></p>
		}else {
			aGif = <p><img src="https://m.popkey.co/a3c6f3/EaGD_f-maxage-0.gif"/></p>
		}
		
		return (
			<div id="finished-game" className="well text-center">
				<h3>{this.props.finishedGame}</h3>
				{aGif}
			<button className="btn btn-default play-again" onClick={this.props.resetGame}> Play Again? </button>
			</div>
		)
	}
};

export default FinishedBox;
