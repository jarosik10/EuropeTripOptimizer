import React from 'react';
import PropTypes from 'prop-types';
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

const DestinationPoints = ({ capitals, handleCancel }) => {
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

DestinationPoints.propTypes = {
    capitals: PropTypes.arrayOf(PropTypes.shape({
        capitalName: PropTypes.string.isRequired,
        countryId: PropTypes.string.isRequired,
        isStartingPoint: PropTypes.bool,
    })),
    handleCancel: PropTypes.func.isRequired,
}

export default DestinationPoints;