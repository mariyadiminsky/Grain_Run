import React from 'react';

class AnswerBox extends React.Component{
	constructor(props) {
		super(props);
	}
	
	render() {
		// important because can't be accessed inside variable
		let props = this.props;
		let selectedNums = props.selectedNums.map((num) => {
			return(
				<div className="number" onClick={props.unClickedNum.bind(null, num)}>{num}</div>
			)
		});
		return(
			<div id="answer-box">
				<div className="well text-center">
					{selectedNums}
				</div>
			</div>
		)
	}
};

export default AnswerBox;