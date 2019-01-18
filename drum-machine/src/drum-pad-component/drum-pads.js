import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Drum_pads extends Component {
	constructor(props) {
		super(props);
		this.handleDrum = this.handleDrum.bind(this);
		this.keyPressed = this.keyPressed.bind(this);
		this.playSound= this.playSound.bind(this);
		this.triggeredPad= this.triggeredPad.bind(this);
	}
	componentDidMount() {
		document.addEventListener('keydown', this.keyPressed);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.keyPressed);
	}
	handleDrum(str,keyID) {
		return (e) => { e.preventDefault(); this.playSound(keyID); console.log(document.getElementById(keyID).volume); this.props.submitNewDisplay(str); }
	};
	
	playSound(str)
	{
		document.getElementById(str).volume=this.props.adjusted;
		document.getElementById(str).play();
		document.getElementById(str).currentTime=0;
	}
	
	triggeredPad(padN)
	{
		document.getElementById(padN).style.backgroundColor="#d3d3d3";
		setTimeout(() => {
			document.getElementById(padN).style.backgroundColor="#5f5e5e";
		}, 200);
	}

	keyPressed(e) {
		e.preventDefault();
		if (e.key === 'q' || e.key === 'e' || e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === 'z' || e.key === 'x' || e.key === 'c') 
		{
			for (let track of this.props.audioLib) {
				if (e.key === track.padkey.toString().toLowerCase()) {
					this.playSound(track.padkey);
					this.triggeredPad(track.name);
					this.props.submitNewDisplay(track.name);
					break;
				}
			}
		}
	};

	render() {
		const stylePad= { cursor: 'pointer', userSelect: 'none' };
		return (
			this.props.audioLib.map((key, indx) => {
				let sampleName = key.name;
				return (<div style={stylePad}  className={`drum-pad text-center ${key.padkey}`} id={sampleName} key={sampleName} onClick={this.handleDrum(sampleName,key.padkey)}>
					{key.padkey}<audio key={sampleName} className="clip" src={key.source}  type="audio/mp3" id={key.padkey}></audio>
				</div>);
			}));
	};
};

Drum_pads.propTypes = {
	audioLib: PropTypes.array
};

export default Drum_pads;