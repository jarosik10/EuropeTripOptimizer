import React from 'react';
import styled from 'styled-components';

import StartingPoint from '../StartingPoint/StartingPoint';

const StyledControlPanel = styled.div`
    position: fixed;
    background-color: white;
    top: 0;
    right: 0;
    bottom: 0;
    padding-top: 60px;
    width: 80%;
    /* height: calc(100% - 60px); */
    transform: translateX(${({isOpen}) => isOpen ? '0' : '100%'});
    transition: transform .3s ease-in-out;
    z-index: 9998;
`;

const StyledDestinationPointsWrapper = styled.div`
    background-color: #E1EBFF;
`;

const ControlPanel = ({isOpen, ...props}) => {

    return (
        <StyledControlPanel isOpen={isOpen} >
           <StartingPoint />
        </StyledControlPanel>
    );
}

export default ControlPanel;