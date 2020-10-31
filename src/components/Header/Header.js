import React from 'react';
import PropsTypes from 'prop-types';
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
    z-index: ${({ theme }) => theme.zindex.level7};
    position: fixed;
    width: 100%;
    top: 0;

    ${({ theme }) => theme.media.smallDesktop} {
        left: 0;
        width: 30%;
        max-width: 380px;
        justify-content: center;
    }

`;

const Header = ({ showHamburger, isControlPanelOpen, onControlPanelToggle }) => {
    return (
        <StyledHeader>
            <SiteTitle />
            <Hamburger showHamburger={showHamburger} isActivated={isControlPanelOpen} onClick={onControlPanelToggle} />
        </StyledHeader>
    );
}

Header.propTypes = {
    onControlPanelToggle: PropsTypes.func.isRequired,
}

export default Header;