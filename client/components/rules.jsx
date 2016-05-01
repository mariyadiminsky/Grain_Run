import React from 'react';

class Rules extends React.Component{
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div id="rules" className="well text-center">
				<h3>How To Play</h3>
				<p>
					Well Hillibilly do da! Come along boys and girls!<br /> Race against time to help your friend Sasha collect all the grains on her daddy's farm land!<br /> 
					Can you find the right number of grains before sunrise?<br />
				</p>
			
				<div>
					<p> 
						You a given numbers 1 - 9.<br /> 
						Match the numbers in your posession with the number of grains Sasha needs to acquire.<br />
						For every correct choice, you will not be able to use the same numbers again so choose wisely! <br />
						HINT: Refresh only when you really need to.
					</p>
				</div>
			
			</div>
		)
	}
};

export default Rules;
