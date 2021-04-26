import React from 'react';

import { Container } from './styles';

const FormInput = ({handleChange, label, ...otherProps}) => (
    <Container>
        <input className="form-input" onChange={handleChange} {...otherProps}/>
        {label ? (
            <label
                className={
                    `${otherProps.value.length ? 'shrink' : ''} 
                     form-input-label`}>
                {label}
            </label>
        ) : null
        }
    </Container>

)

export default FormInput;

