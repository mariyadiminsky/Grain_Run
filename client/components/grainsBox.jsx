import React from 'react';

class GrainsBox extends React.Component{
	constructor(props) {
		super(props)
	}
	
	render() {
		let grains = [];
		for(let i=1; i<=this.props.numGrains; i++) {
			grains.push(
				<span className='glyphicon glyphicon-grain'></span>
			);
		}
		return (
			<div id="grains-box">
				<div className="well text-center">
					{grains}
				</div>
			</div>
		)
	}
};

export default GrainsBox;