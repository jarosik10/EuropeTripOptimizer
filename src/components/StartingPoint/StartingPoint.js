import React from 'react';
import styled from 'styled-components';
import H2 from '../H2/H2';
import Capital from '../Capital/Capital';

const StyledStartingPointWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.lightBlue};
    width: 100%;
    flex-shrink: 0;
    min-height: 120px;
`;

const StartingPoint = ({capital, handleCancel}) => {

    return (
        <StyledStartingPointWrapper>
            <H2>Starting point</H2>
            {capital ? <Capital name={capital.capitalName} countryShortcut={capital.countryId} handleCancel={handleCancel}/> : null}
        </StyledStartingPointWrapper>
    );
}

export default StartingPoint;