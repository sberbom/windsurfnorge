import '../styles/checkbox.css'

import React from 'react';
import { WindDirectionsValues } from '../types/types';

interface IProps {
    label: string;
    state: string;
    onChange: (state: WindDirectionsValues) => void;
}

function Checkbox({label, state, onChange}:IProps): JSX.Element {

    const onBoxClick = () => {
        if(state==="bad"){
            onChange("ok")
        }
        else if(state==="ok"){
            onChange("good")
        }
        else if(state==="good") {
            onChange("bad")
        }
    }

    const getBackgroundColor = (state: string) => {
        if(state === "ok") {
            return {backgroundColor: 'yellow'};
        }
        else if(state === "good" ) {
            return {backgroundColor: 'green'};
        }
        return {backgroundColor: 'red'};
    }

    return(
        <div className="box-container">
            {label} 
            <div className="box" onClick={onBoxClick} style={getBackgroundColor(state)}/>
        </div>
        
    )
}

export default Checkbox;