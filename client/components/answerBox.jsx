import React from 'react';

class AnswerBox extends React.Component{
	constructor(props) {
		super(props);
	}
	
	render() {
		// important because can't be accessed inside variable
		let props = this.props;
		let toShow;
		let selectedNums = props.selectedNums.map((num) => {
			return(
				<div className="number" onClick={props.unClickedNum.bind(null, num)}>{num}</div>
			)
		});
		if(props.response !== null) {
			toShow = <div className="response">{props.response}</div>
		}else {
			toShow = selectedNums;
		}

		return(
			<div id="answer-box">
				<div className="well text-center">
					{toShow}
				</div>
			</div>
		)
	}
};

export default AnswerBox;