import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHamburger = styled.button`
    padding: 15px 5px;
    border: none;
    background: none;
    display: ${({ showHamburger }) => showHamburger ? 'block' : 'none'};

    ${({ theme }) => theme.media.smallDesktop} {
        display: none;
    }
`;

const InnerHamburger = styled.div`
    position: relative;
    width: 28px;
    height: 3px;
    background-color: ${({ theme, isActivated }) => isActivated ? 'transparent' : theme.colors.white};

    ::after, ::before {
        content: '';
        position: absolute;
        left: 0;
        width: 28px;
        height: 3px;
        background-color: ${({ theme }) => theme.colors.white};
        transition: transform 0.2s ease-out;
    }

    ::before {
        top: -9px;
        transform: ${({ isActivated }) => isActivated ? 'translateY(9px) rotate(45deg)' : null};
    }

    ::after {
        top: 9px;
        transform: ${({ isActivated }) => isActivated ? 'translateY(-9px) rotate(-45deg)' : null};
    }
`;

const Hamburger = ({ onClick, showHamburger, isActivated }) => (
    <StyledHamburger showHamburger={showHamburger} onClick={onClick}>
        <InnerHamburger isActivated={isActivated}/>
    </StyledHamburger>
);

Hamburger.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default Hamburger;