import React from 'react';

class NumbersBox extends React.Component{
	constructor(props) {
		super(props)
	}
	
	render() {
		let numbers = [];
		for(let i=1; i<=9; i++) {
			
			// disable numbers that went through a session and correctly matched the number of grains, they should be in acceptedNumbers array.
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
				<div className="well text-center">
					{numbers}
				</div>
			</div>
		)
	}
}

export default NumbersBox;