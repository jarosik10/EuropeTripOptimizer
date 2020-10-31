import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import StartingPoint from '../StartingPoint/StartingPoint';
import DestinationPoints from '../DestinationPoints/DestinationPoints';
import Button from '../Button/Button';
import CAPITAL_COORDINATES from './../../assets/data/capitals-coordinates.json';

const StyledControlPanel = styled.div`
    position: fixed;
    background-color: ${({ theme }) => theme.colors.white};
    top: 0;
    right: 0;
    bottom: 0;
    padding-top: 60px;
    width: 80%;
    transform: translateX(${({ isOpen }) => isOpen ? '0' : '100%'});
    visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
    transition: transform .3s ease-in-out, visibility .3s ease-in-out;
    z-index: ${({ theme }) => theme.zindex.level6};
    display: grid;
    grid-template-rows: auto 1fr auto;
    border-left: 1px solid ${({ theme }) => theme.colors.darkBlue};
    box-shadow: -1px 0px 4px 1px rgba(0, 0, 0, 0.25);    

    ${({ theme }) => theme.media.smallTablet} {
        width: 50%;
    }

    ${({ theme }) => theme.media.mobileLandscape} {
        width: 100%;
        padding-top: 65px;
        grid-template-columns: 1fr 1fr auto;
        grid-template-rows: auto;
    }

    ${({ theme }) => theme.media.tablet} {
        width: 40%;
        max-width: 350px;
    }

    ${({ theme }) => theme.media.smallDesktop} {
        position: static;
        width: 30%;
        max-width: 380px;
        height: 100vh;
        transform: translateX(0);
        visibility: visible;
        flex-shrink: 0;
        border-right: 1.5px solid ${({ theme }) => theme.colors.darkBlue};
        box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.25);    
    }
`;

const StyledButtonWrapper = styled.div`
    position: relative;
    width: 100%;
    bottom: 0;
    margin-top: auto;
    background-color: ${({ theme }) => theme.colors.white};
    
    ::before {
        content: '';
        display: block;
        position: absolute;
        top: 5px;
        width: 90%;
        height: 2px;
        border-radius: 5px;
        left: 50%;
        background-color: ${({ theme }) => theme.colors.gray};
        transform: translateX(-50%);
    }

    ${({ theme }) => theme.media.mobileLandscape} {
        margin-bottom: auto;
        padding: 0 5px;

        ::before {
            content: unset;
        }
    }
`;

const ControlPanel = ({ isOpen, selectedCapitals, removeCapital, submit, fetchDistanceMatrix }) => {
    const getCapitalsLocations = (capitals) => {
        const [startingPoint] = capitals.filter(({ isStartingPoint }) => isStartingPoint);
        if (startingPoint) {
            const countriesID = capitals.map(({countryId}) => countryId.toUpperCase());
            const chosenCapitalsCoordinates = CAPITAL_COORDINATES.filter(({CountryCode}) => countriesID.includes(CountryCode));
            // Put the starting point at the begginging of the chosen capitals coordinates array
            chosenCapitalsCoordinates.unshift(chosenCapitalsCoordinates.splice(chosenCapitalsCoordinates.findIndex(({ CountryCode }) => CountryCode === startingPoint.countryId.toUpperCase()), 1)[0]);
            const locations = chosenCapitalsCoordinates.map(({ CapitalLatitude, CapitalLongitude }) => [CapitalLongitude, CapitalLatitude]);
            const orderedCountresID = chosenCapitalsCoordinates.map(({ CountryCode }) => CountryCode);
            return [locations, orderedCountresID];
        }
    }

    const handleClick = () => {
        submit();
        const [locations, orderedCountresID] = getCapitalsLocations(selectedCapitals);
        fetchDistanceMatrix(locations, orderedCountresID);
    }

    const [startingPointCapital] = selectedCapitals.filter(({ isStartingPoint }) => isStartingPoint);
    const destinationPointsCapitals = selectedCapitals.filter(({ isStartingPoint }) => !isStartingPoint);
    const isEnoughCapitals = startingPointCapital !== undefined && destinationPointsCapitals.length > 0;
    return (
        <StyledControlPanel isOpen={isOpen} >
            <StartingPoint capital={startingPointCapital} handleCancel={removeCapital} />
            <DestinationPoints capitals={destinationPointsCapitals} handleCancel={removeCapital} />
            <StyledButtonWrapper>
                <Button isEnabled={isEnoughCapitals} handleClick={handleClick} isCentered>Calculate route</Button>
            </StyledButtonWrapper>
        </StyledControlPanel>
    );
}

const mapStateToProps = state => {
    return { selectedCapitals: state.capitals.selectedCapitals }
}

const mapDispatchToProps = dispatch => {
    return {
        removeCapital: countryId => dispatch(actions.removeCapital(countryId)),
        fetchDistanceMatrix: (locations, capitalsOrder) => dispatch(actions.fetchDistanceMatrix(locations, capitalsOrder)),
    }
}

ControlPanel.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    selectedCapitals: PropTypes.arrayOf(PropTypes.shape({
        capitalName: PropTypes.string.isRequired,
        countryId: PropTypes.string.isRequired,
        isStartingPoint: PropTypes.bool.isRequired,
    })),
    removeCapital: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);