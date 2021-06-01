import React from 'react';

interface IProps {
    title: string;
    value: string;
    onChange: (event: any) => void;
    type?: string;
    readOnly?: boolean;
}

const Input = ({title, value, onChange, type, readOnly}: IProps) =>  {
 
    
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
                readOnly={readOnly}
            />
        </div>
    )
}

export default Input;