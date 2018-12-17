import React from 'react';

const OutputTextArea= function (props)
{
		return(
            <div id="pick">
                <br />
                    <div id="preview" dangerouslySetInnerHTML={{__html: props.preview.mark}} ></div>
                <br />
                    <textarea id="html_preview" name="html_previewer" readonly value={props.preview.mark} type="text"/>
            </div>
        );
} 

export default OutputTextArea;