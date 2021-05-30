import React from 'react';

interface IProps {
    title: string;
    value: string;
    onChange: (event: any) => void;
    type?: string;
}

const Input = ({title, value, onChange, type}: IProps) =>  {
 
    
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