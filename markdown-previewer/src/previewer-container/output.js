import React from 'react';

const OutputTextArea= function (props){

			switch(props.picked){
				case "prev":
				{
					return(<p id="preview" dangerouslySetInnerHTML={{__html: props.preview.mark}} ></p>);
				}
				case "src":
				{
					return(<div id="html_preview">{props.preview.mark}</div>);
				}
				default:
				{
					return;
				}
			}
} 

export default OutputTextArea;