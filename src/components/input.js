import React from 'react';


const Input = ({title, value, onChange, type}) =>  {
 
    
    return(
        <div className="mb-3 input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">{title}</span>
            </div>
            <input
                className="form-control"
                value={value}
                type={type}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    )
}

export default Input;