import React from 'react';

const VolumeSlider = function (props)
{
	const handleChange= (e)=>
	{ 
		e.preventDefault();
		props.submitNewVolumeValue(e.target.value);
	};
	return (<div id="volume-slider"><input type="range" id="slider" min="0" max="1" value={props.adjusted} step="0.1" onChange={handleChange}/><i className="fas fa-volume-up text-center"></i></div>);
};

export default VolumeSlider;