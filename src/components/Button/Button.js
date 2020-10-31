import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
    border: none;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    color: white;
    font-size: ${({ isSmall }) => isSmall ? '14px' : '16px'};
    padding: ${({ isSmall }) => isSmall ? '8px 14px' : '10px 16px'};
    border-radius: 12px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
    display: block;
    margin: ${({ isCentered }) => isCentered ? '16px auto' : '16px 0'};
    cursor: pointer;

    :disabled {
        background-color: #C0C0C0;
        box-shadow: inset 2px 4px 6px 2px rgba(0,0,0,0.5);
        cursor: not-allowed;
    }
`;

const Button = ({ isEnabled, handleClick, children, isSmall, isCentered }) => {
    return (
        <StyledButton disabled={!isEnabled} onClick={handleClick} isSmall={isSmall} isCentered={isCentered}>{children}</StyledButton>
    );
}

Button.propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

export default Button;