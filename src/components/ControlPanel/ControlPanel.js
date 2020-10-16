import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../store/index';
import StartingPoint from '../StartingPoint/StartingPoint';
import DestinationPoints from '../DestinationPoints/DestinationPoints';
import Button from '../Button/Button';

const StyledControlPanel = styled.div`
    position: fixed;
    background-color: white;
    top: 0;
    right: 0;
    bottom: 0;
    padding-top: 60px;
    width: 80%;
    transform: translateX(${({ isOpen }) => isOpen ? '0' : '100%'});
    transition: transform .3s ease-in-out;
    z-index: 9998;
    display: grid;
    grid-template-rows: auto 1fr auto;
    box-shadow: -1px 0px 4px 1px rgba(0, 0, 0, 0.25);
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

`;

const ControlPanel = ({ isOpen, ...props }) => {
    const handleClick = () => {
        console.log('clicked!')
    }

    const [startingPointCapital] = props.selectedCapitals.filter(({ isStartingPoint }) => isStartingPoint);
    const destinationPointsCapitals = props.selectedCapitals.filter(({ isStartingPoint }) => !isStartingPoint);
    const isEnoughCapitals = startingPointCapital && destinationPointsCapitals.length > 0;
    return (
        <StyledControlPanel isOpen={isOpen} >
            <StartingPoint capital={startingPointCapital} handleCancel={props.removeCapital}/>
            <DestinationPoints capitals={destinationPointsCapitals} handleCancel={props.removeCapital}/>
            <StyledButtonWrapper>
                <Button isEnabled={isEnoughCapitals} handleClick={handleClick}>Calculate route</Button>
            </StyledButtonWrapper>
        </StyledControlPanel>
    );
}

const mapStateToProps = state => {
    return { selectedCapitals: state.selectedCapitals }
}

const mapDispatchToProps = dispatch => {
    return {
        removeCapital: countryId => dispatch(actions.removeCapital(countryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);