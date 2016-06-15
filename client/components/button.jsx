import React from 'react';

class Button extends React.Component{
	constructor(props) {
		super(props)
	}
	
	render() {
		let disabled = this.props.selectedNums.length === 0;
		let correct = this.props.isCorrect;
		let theBtn;
		
		switch(correct) {
			case true:
				theBtn = (
					<div className="btn btn-success btn-lg chk-btn" onClick={this.props.acceptAnswer}>
						<span className='glyphicon glyphicon-ok'></span>
					</div>
				)
				break;
			case false:
				theBtn = (
					<div className="btn btn-danger btn-lg chk-btn">
						<span className='glyphicon glyphicon-remove'></span>
					</div>
				)
				break;
			default:
				theBtn = (
					<div className="btn btn-warning btn-lg chk-btn" onClick={this.props.chkAnswer} disabled = {disabled}>
						=
					</div>
				)
		}
		
		// this: &nbsp; means an unbreaking space
		return (
			<div id="button-game">
				{theBtn}
			<br /><br />
			<button className="btn btn-warning btn-lg" onClick={this.props.refreshGrains} disabled={this.props.refreshAmount === 0}>
				<span className="glyphicon glyphicon-refresh"></span>   
			&nbsp;
			{this.props.refreshAmount}
			</button>
			</div>
		)
	}
};

export default Button;