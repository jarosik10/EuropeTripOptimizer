import React from 'react';
import styled from 'styled-components';

const StyledHamburger = styled.button`
    padding: 15px 5px;
    border: none;
    background: none;

    ${({theme}) => theme.media.smallDesktop} {
        display: none;
    }
`;

const InnerHamburger = styled.div`
    position: relative;
    width: 28px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.white};

    ::after, ::before {
        content: '';
        position: absolute;
        left: 0;
        width: 28px;
        height: 3px;
        background-color: ${({ theme }) => theme.colors.white};
    }

    ::before {
        top: -9px;
    }

    ::after {
        top: 9px;
    }
`;

const Hamburger = ({onClick}) => (
    <StyledHamburger onClick={onClick}>
        <InnerHamburger />
    </StyledHamburger>
);

export default Hamburger;