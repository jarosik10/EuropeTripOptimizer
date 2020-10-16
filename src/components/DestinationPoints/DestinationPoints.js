import React from 'react';
import styled from 'styled-components';

import H2 from '../H2/H2';
import Capital from '../Capital/Capital';

const StyledDestinatinoPointsWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const StyledUL = styled.ul`
    overflow-y: scroll;
    list-style: none;
    padding: 0;
    margin: 0;

`;

const StartingPoint = ({ capitals, handleCancel }) => {
    return (
        <StyledDestinatinoPointsWrapper>
            <H2 isDark>Destination points</H2>
            <StyledUL>
                {capitals.map(capital => (
                    <li key={capital.countryId}>
                        <Capital name={capital.capitalName} countryShortcut={capital.countryId} handleCancel={handleCancel} />
                    </li>
                ))}
            </StyledUL>
        </StyledDestinatinoPointsWrapper>
    );
}

export default StartingPoint;