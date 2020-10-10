import React from 'react';
import styled from 'styled-components';

import H2 from '../H2/H2';

const StyledStartingPointWrapper = styled.div`
    background-color: #E1EBFF;
    height: 20%;
`;

const StartingPoint = props => {
    return (
        <StyledStartingPointWrapper>
            <H2>Starting Point</H2>
        </StyledStartingPointWrapper>
    );
}

export default StartingPoint;