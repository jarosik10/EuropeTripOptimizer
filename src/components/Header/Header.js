import React from 'react';
import styled from 'styled-components';
import SiteTitle from '../SiteTitle/SiteTitle';
import Hamburger from '../Hamburger/Hamburger';

const StyledHeader = styled.header`
    background-color: ${({ theme }) => theme.colors.darkBlue};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    min-height: 60px;
    z-index: 9999;
    position: fixed;
    width: 100%;
    top: 0;

`;


const Header = ({onControlPanelToggle, ...props}) => {
    return (
        <StyledHeader>
            <SiteTitle />
            <Hamburger onClick={onControlPanelToggle}/>
        </StyledHeader>
    );
}

export default Header;