import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    border: none;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    color: white;
    font-size: 16px;
    padding: 10px 16px;
    border-radius: 12px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
    display: block;
    margin: 16px auto;

    :disabled {
        background-color: #C0C0C0;
        box-shadow: inset 2px 4px 6px 2px rgba(0,0,0,0.5);
    }
`;

const Button = ({ isEnabled, handleClick, ...props }) => {
    return (
        <StyledButton disabled={!isEnabled} onClick={handleClick}>{props.children}</StyledButton>
    );
}

export default Button;