import React from 'react';
import PropTypes from 'prop-types';
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

StartingPoint.propTypes = {
    capitals: PropTypes.arrayOf(PropTypes.shape({
        capitalName: PropTypes.string.isRequired,
        countryId: PropTypes.string.isRequired,
        isStartingPoint: PropTypes.bool,
    })),
    handleCancel: PropTypes.func.isRequired,
}

export default StartingPoint;